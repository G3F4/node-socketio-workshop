const socketio = require('socket.io');
const { DEFAULT_NAME, DEFAULT_ROOM, EVENTS } = require('./constans');

module.exports = server => {
  const io = socketio(server);
  // for simplicity
  let connections = 0;
  const connected = {};
  const users = {};

  io.on(EVENTS.CONNECTION, socket => {
    console.log(['io.on'], EVENTS.CONNECTION, socket.id);
    const user = {
      id: socket.id,
      room: DEFAULT_ROOM,
      name: `${DEFAULT_NAME}${connections}`,
    };

    // add user to connected users and create mapping for accessing users info by name and socket id
    connections++;
    connected[socket.id] = users[user.name];
    users[user.name] = user;

    // event handlers
    const onDisconnect = () => {
      console.log(['io.on'], EVENTS.DISCONNECT, connected);
      socket.broadcast.emit(EVENTS.MESSAGE, `Użytkownik ${user.name} rozłączył się`);

      delete connected[socket.id];
      delete users[user.name];
    };
    const onMessage = ({ message }) => {
      console.log(['socket.on'], EVENTS.MESSAGE, { message });

      io.sockets.in(user.room).emit(EVENTS.MESSAGE, `${user.name}: ${message}`);
    };

    // join room and emit initial data
    socket.join(user.room, () => {
      socket.broadcast.emit(EVENTS.MESSAGE, `Użytkownik ${user.name} połączył się`);
    });

    // handle sockets events
    socket.on(EVENTS.DISCONNECT, onDisconnect);
    socket.on(EVENTS.MESSAGE, onMessage);
  });
};
