const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// setup socket io to every origin this for enable cors
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Waiting for Client
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Recieve Message from Client
  socket.on('message', (data) => {
    console.log('Message received:', data);
    // boadcast message to every client who is connected
    io.emit('message', data);
  });

  // disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Define the port to run the server
const PORT = process.env.PORT || 3006;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
