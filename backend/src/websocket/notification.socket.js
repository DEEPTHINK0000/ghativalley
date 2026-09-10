let ioInstance;

const initWebSocket = (io) => {
  ioInstance = io;
  io.on('connection', (socket) => {
    console.log(`⚡ Client connected: ${socket.id}`);

    socket.on('join_room', (roleRoom) => {
      socket.join(roleRoom);
      console.log(`Socket ${socket.id} joined room: ${roleRoom}`);
    });

    socket.on('disconnect', () => {
      console.log(`🔌 Client disconnected: ${socket.id}`);
    });
  });
};

const notifyClients = (room, event, data) => {
  if (ioInstance) {
    ioInstance.to(room).emit(event, data);
  }
};

module.exports = { initWebSocket, notifyClients };