const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const patientRoutes = require('./routes/patientRoutes');
const setupSockets = require('./sockets');


const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
}));

// Inject io to request for every request can use req.io
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Initialize Socket Events
setupSockets(io);

//Setup Routes
app.use('/api/patients', patientRoutes);

//Start Server
const PORT = process.env.PORT || 3006;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
