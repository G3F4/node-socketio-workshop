const socketio = require('socket.io');
const { logUserMessage } = require('../../db/api');
const { DEFAULT_NAME, DEFAULT_ROOM, EVENTS } = require('../constans');

// file globals for simplicity
const connected = {};
const users = {};
const rooms = [DEFAULT_ROOM];
let connections = 0;

// handle sockets
exports.listen = (server) => {
  const io = socketio(server);
  io.on(EVENTS.CONNECTION, (socket) => {
    console.log(['io.on'], EVENTS.CONNECTION, socket.id);
    const user = {
      name: `${DEFAULT_NAME}${connections}`,
      id: socket.id,
      room: DEFAULT_ROOM
    };
    const onName = (value) => {
      console.log(['socket.on'], EVENTS.NAME, value);
      if (users[value]) {
        socket.emit(EVENTS.MESSAGE, `Nazwa ${value} jest zajęta`)
      } else {
        const oldName = user.name;

        user.name = value;
        users[value] = user;
        delete users[oldName];

        socket.broadcast.to(users[value].room).emit(EVENTS.MESSAGE, `Użytkownik ${oldName} zmienił nazwę na: ${value}`);
        socket.emit(EVENTS.MESSAGE, `Zmieniłeś nazwę na ${value}`);
        socket.emit(EVENTS.USER, user.name);
        socket.broadcast.emit(EVENTS.USERS, Object.keys(users));
        socket.emit(EVENTS.USERS, Object.keys(users));
      }
    };
    const onRoom = (value) => {
      console.log(['socket.on'], EVENTS.ROOM, value);
      const oldRoom = user.room;

      if (rooms.indexOf(value) < 0) {
        rooms.push(value);
        socket.broadcast.emit(EVENTS.ROOMS, rooms);
        io.local.emit(EVENTS.ROOMS, rooms);
        io.sockets.emit(EVENTS.ROOMS, rooms);
      }

      user.room = value;
      socket.join(value);
      socket.leave(oldRoom);
      socket.broadcast.to(oldRoom).emit(EVENTS.MESSAGE, `Użytkownik ${user.name} opuścił pokój`);
      socket.broadcast.to(value).emit(EVENTS.MESSAGE, `Użytkownik ${user.name} dołączył do pokoju`);
      socket.emit(EVENTS.MESSAGE, `Zmieniłeś pokój na ${value}`);
      socket.emit(EVENTS.ROOM, value);
    };
    const onPM = ({ userName, message }) => {
      console.log(['socket.on'], EVENTS.PM, { userName, message });
      const userTo = users[userName];

      if (userTo) {
        socket.to(userTo.id).emit(EVENTS.PM, `Użytkownik ${user.name} wysłał Ci prywatną wiadomość o treści: ${message}`);
        socket.emit(EVENTS.PM, `Prywatna wiadomość do ${userName}: ${message}`);
      } else {
        socket.emit(EVENTS.PM, `Nie można wysłać wiadomości do użytkownika ${userName}`);
      }
    };
    const onDisconnect = () => {
      console.log(['io.on'], EVENTS.DISCONNECT, connected);
      io.clients((error, users) => {
        socket.broadcast.emit(EVENTS.MESSAGE, `Użytkownik ${user.name} rozłączył się`);
        socket.broadcast.emit(EVENTS.USERS, users);
      });

      delete connected[user.name];
    };
    const onMessage = async (data) => {
      console.log(['socket.on'], EVENTS.MESSAGE, data);
      const name = user.name;

      await logUserMessage(name, user.room, data);

      io.sockets.in(user.room).emit(EVENTS.MESSAGE, `${name}: ${data}`);
    };

    // add user to connected users and create mapping for accessing users info by name and socket id
    users[user.name] = user;
    connected[socket.id] = users[user.name];
    connections++;

    // join room and emit initial data
    socket.join(user.room);
    socket.emit(EVENTS.ROOM, user.room);
    socket.emit(EVENTS.ROOMS, rooms);
    socket.emit(EVENTS.USER, user.name);
    socket.emit(EVENTS.USERS, Object.keys(users));
    socket.broadcast.emit(EVENTS.USERS, Object.keys(users));
    socket.broadcast.emit(EVENTS.MESSAGE, `Użytkownik ${user.name} połączył się`);

    // handle sockets events
    socket.on(EVENTS.MESSAGE, onMessage);
    socket.on(EVENTS.NAME, onName);
    socket.on(EVENTS.PM, onPM);
    socket.on(EVENTS.ROOM, onRoom);
    socket.on(EVENTS.DISCONNECT, onDisconnect);
  });
};
