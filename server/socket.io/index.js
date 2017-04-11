const socketio = require('socket.io');
const { logUserMessage } = require('../../db/api');
const { DEFAULT_NAME, DEFAULT_ROOM, EVENTS, COMMANDS } = require('../constans');

const connected = {};
const rooms = [DEFAULT_ROOM];
let connections = 0;

const getConnectedUserBySocketId = (id) => Object.keys(connected)
  .map(key => connected[key])
  .find(user => user.id === id);

const extractCommandAndValue = (data) => ({
  command: data.split(' ').slice(0, 1).join(''),
  value: data.split(' ').slice(1).join(' ')
});

exports.listen = (server) => {
  const io = socketio(server);
  io.on(EVENTS.CONNECTION, (socket) => {
    console.log(['io.on'], EVENTS.CONNECTION);
    connections++;
    const name = `${DEFAULT_NAME}${connections}`;
    const user = {
      name,
      socket,
      id: socket.id,
      room: DEFAULT_ROOM
    };
    connected[name] = user;

    socket.join(DEFAULT_ROOM);
    socket.emit(EVENTS.ROOM, DEFAULT_ROOM);
    socket.emit(EVENTS.ROOMS, rooms);

    socket.on(EVENTS.MESSAGE, async (data) => {
      console.log(['socket.on'], EVENTS.MESSAGE, data);
      const name = user.name;
      await logUserMessage(name, user.room, data);

      io.sockets.in(user.room).emit(EVENTS.MESSAGE, `${name}: ${data}`);
    });

    socket.on(EVENTS.PM, (data) => {
      console.log(['socket.on'], EVENTS.PM, data);
      const { command: userToName, value } = extractCommandAndValue(data);
      const userTo = connected[userToName];
      const userToSocket = userTo ? userTo.socket : null;
      const userFrom = getConnectedUserBySocketId(socket.id);

      if (userToSocket) {
        userToSocket.emit(EVENTS.PM, `Użytkownik ${userFrom.name} wysłał Ci prywatną wiadomość o treści: ${value}`);
        socket.emit(EVENTS.PM, `Prywatna wiadomość do ${userToName}: ${value}`);
      } else {
        socket.emit(EVENTS.PM, `Nie można wysłać wiadomości do użytkownika ${userToName}`);
      }
    });

    socket.on(EVENTS.COMMAND, (data) => {
      console.log(['socket.on'], EVENTS.COMMAND, data);
      const { command, value } = extractCommandAndValue(data);

      if (command === COMMANDS.NAME) {
        if (connected[value]) {
          socket.emit(EVENTS.MESSAGE, `Nazwa ${value} jest zajęta`)
        } else {
          const oldName = user.name;

          user.name = value;
          connected[value] = user;
          delete connected[oldName];

          socket.broadcast.to(connected[value].room).emit(EVENTS.MESSAGE, `Użytkownik ${oldName} zmienił nazwę na: ${value}`);
          socket.emit(EVENTS.MESSAGE, `Zmieniłeś nazwę na ${value}`);
        }
      }

      if (command === COMMANDS.ROOM) {
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
      }
    });

    socket.on(EVENTS.DISCONNECT, () => {
      console.log(['io.on'], EVENTS.DISCONNECT);
    });
  });
};
