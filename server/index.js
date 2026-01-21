import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});


io.on('connection', (socket) => {
  console.log('a user connected' + socket.id);


  socket.on("create-room", () => {
    const roomId = crypto.randomUUID().slice(0, 6);

    socket.join(roomId);

    console.log(`Room ${roomId} created`);
    socket.emit("room-created", { roomId });
  });


  socket.on("join-room", ({ roomId, username }) => {

    console.log(`User ${username} is trying to join room ${roomId}`);

    const roomExists = io.sockets.adapter.rooms.has(roomId);
    if (!roomExists) {
      socket.emit("error", "Room does not exist");
      return;
    }
    
    socket.join(roomId);
    socket.to(roomId).emit("user-joined", username);
  });



});






app.get('/', (req, res) => {
  res.json({ message: "Hello World" });
})

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});