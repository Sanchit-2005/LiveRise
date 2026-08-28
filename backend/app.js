import express, { Router, urlencoded } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "node:http"; //Creates a Node.js HTTP server
import { connectToSocket } from "./src/controllers/socketManager.js";
const app = express();
const server = createServer(app); // Creates an HTTP server and uses the Express app to handle HTTP requests
const io = connectToSocket(server); //Attach Socket.IO to this particular HTTP server.
import userRoutes from "./src/routes/userroute.js"
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(urlencoded({limit:"40kb",extended:true}));
app.use("/api/v1/users",userRoutes);
app.set("port", 8000);

app.get("/", function (req, res, next) {
  res.json({ msg: "Hello" });
});


const start = async () => {
  const connectDb = await mongoose.connect(
    "mongodb+srv://vijaywakpanjar877_db_user:B3muGNSUQQt6Ki2Y@cluster1.wy1dych.mongodb.net/",
  );
  console.log(connectDb.connection.host);
  server.listen(app.get("port"), function () {
    console.log("http server listening on port 8000");
  });
};

start();
