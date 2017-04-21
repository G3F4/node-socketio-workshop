const socketio = require('socket.io');
const { DEFAULT_NAME, DEFAULT_ROOM, EVENTS } = require('./constans');

// handle sockets
module.exports = server => {
  const io = socketio(server);
  const connected = {};
  const users = {};
  let connections = 0;

  io.on(EVENTS.CONNECTION, socket => {
    socket.emit('connected', socket);
    console.log(['io.on'], EVENTS.CONNECTION, socket.id);
    const user = {
      logged: false,
      name: `${DEFAULT_NAME}${connections}`,
      id: socket.id,
    };

    // add user to connected users and create mapping for accessing users info by name and socket id
    users[user.name] = user;
    connected[socket.id] = users[user.name];
    connections++;

    const onMessage = ({ message }) => {
      console.log(['socket.on'], EVENTS.MESSAGE, { message });
      io.local.emit(EVENTS.MESSAGE, `${user.name}: ${message}`);
      // io.sockets.in(user.room).emit(EVENTS.MESSAGE, `${user.name}: ${message}`);
    };
    const onDisconnect = () => {
      console.log(['io.on'], EVENTS.DISCONNECT, connected);

      delete connected[socket.id];
      delete users[user.name];
    };

    socket.broadcast.emit(EVENTS.MESSAGE, `Użytkownik ${user.name} połączył się`);

    // handle sockets events
    socket.on(EVENTS.DISCONNECT, onDisconnect);
    socket.on(EVENTS.MESSAGE, onMessage);
  });
};
