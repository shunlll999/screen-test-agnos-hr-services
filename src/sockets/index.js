const { guestPatientUsers } = require('../controllers/patientController');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('🟢 A user connected:', socket.id);

    socket.on('message', (data) => {
      console.log('Message received:', data);
      io.emit('message', data);
    });

    socket.on('message:greet', (data) => {
      io.emit('message:submitted', guestPatientUsers);
    });

    socket.on('disconnect', () => {
      console.log('🔴 User disconnected:', socket.id);
    });
  });
};
