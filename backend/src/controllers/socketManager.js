import { Server, Socket } from "socket.io";

// .on() = listen/receive
// .to() = choose the destination/send to

export const connectToSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: "*",
      credentials: true,
    },
  });

  let connections = {}; //connectons ek object aahe jo rooms store karnar aani je room aahet tyat ek array asnar jyat aapan user chi socket.id store karnar
  let messages = {}; //he  ek object aahe jo pretek room store karnar aani room ek array store karnar jyat sender ,data aani sender id asnar
  let timeOnline = {}; //ha pratek socket jevha connect zhala tyacha time store karnar

  io.on("connection", (socket) => {
    //"jevha pn  ek  new user connects honar   Socket.IO server run this function

    console.log("someone is connected ");

    socket.on("join-call", (path) => {
      console.log(path); //path means the room ji user join karnar
      if (connections[path] === undefined) {
        //mhanje jo user  room join karto aahe to pahila aahe tr aadhi aapan ek array initalze karnar
        connections[path] = [];
      }
      connections[path].push(socket.id); // room array mdhe socket id store karto
    });

    //jevha konta navit socket(user) join honar tevha  pratek indiviusal socket(user) la send karnar ki new socket aala
    for (let i = 0; i < connections[path].length; i++) {
      io.to(
        connections[path][i].emit("user-joined", socket.id, connections[path]),
      );
    }

    if (messages[path] != undefined) {
      for (let i = 0; i < messages[path].length; i++) {
        io.to(socket.id).emit(
          "chat-message",
          messages[path][i]["data"],
          messages[path][i]["sender"],
          messages[path][i]["socket-id-sender"],
        );
        //jo pn navin socket honar tyala sarv data,jyani message send kela aani socket-id-sender emit krnar
      }
    }

    socket.on("signal", (toId, message) => {
      // jevha  client sends an  event called signal tyananter  run this function.
      io.to(toId).emit("signal", socket.id, message); //send the message to socket with id =toId
    });

    socket.on("chat-message", (data, sender) => {
      const [matchingRoom, found] = Object.entries(connections).reduce(
        ([room, isfound], [roomKey, roomValue]) => {
          if (!isfound && roomValue.includes(socket.id)) {
            return [room, true];
          }
        },
        ["", false],
      );

      if (found === true) {
        if (messages[matchingRoom] === undefined) {
          messages[matchingRoom] = [];
        }
        messages[matchingRoom].push({
          sender: sender,
          data: data,
          "socket-id-sender": socket.id,
        });
        console.log(sender, data, socket.id);
        connections[matchingRoom].array.forEach((user) => {
          io.to(user).emit("chat-message", data, sender, socket.id);
        });
      }
    });

    socket.on("disconnect", () => {
      let differece = Math.abs(timeOnline[socket.id] - new Date());
      let key;

      for (const [k, v] of JSON.parse(
        JSON.stringify(Object.entries(connections)),
      )) {
        for (let a = 0; v.length; a++) {
          if (v[a] === socket.id) {
            key = k;
            for (let a = 0; a < connections[key].length; a++) {
              io.to(connections[key][a]).emit("user-left", socket.id);
            }
            var index = connections[key].indexOf(socket.id);
            connections[key].splice(index, 1);

            if (connections[key].length === 0) {
              delete connections[key];
            }
          }
        }
      }
    });
  });
  return io;
};
