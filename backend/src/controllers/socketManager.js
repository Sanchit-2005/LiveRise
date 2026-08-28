import { Server } from "socket.io";
export const connectToSocket=(server)=>{
const io = new Server(server);

io.on("connection",(socket)=>{
    console.log(socket.id);
})
return io;
} 