const socketio = require('socket.io');
const { logUserMessage } = require('./db/api');
const { DEFAULT_NAME, DEFAULT_ROOM, EVENTS } = require('./constans');
const { login, register, verifyUser } = require('./authenticate');

// handle sockets
module.exports = server => {
  const io = socketio(server);
  const connected = {};
  const users = {};
  const rooms = [DEFAULT_ROOM];
  let connections = 0;

  io.on(EVENTS.CONNECTION, socket => {
    console.log(['io.on'], EVENTS.CONNECTION, socket.id);
    const user = {
      logged: false,
      name: `${DEFAULT_NAME}${connections}`,
      id: socket.id,
      room: DEFAULT_ROOM
    };

    // add user to connected users and create mapping for accessing users info by name and socket id
    users[user.name] = user;
    connected[socket.id] = users[user.name];
    connections++;

    const onName = async ({ token, name }) => {
      console.log(['socket.on'], EVENTS.NAME, { name });
      if (!user.logged) {
        socket.emit(EVENTS.ERROR, `Tylko zalogowani użytkownicy mogą zmieniać nazwę`);
      } else {
        const verified = await verifyUser(token);

        if (verified) {
          if (users[name]) {
            socket.emit(EVENTS.MESSAGE, `Nazwa ${name} jest zajęta`)
          } else {
            const oldName = user.name;

            user.name = name;
            users[name] = user;
            delete users[oldName];

            socket.broadcast.to(users[name].room).emit(EVENTS.MESSAGE, `Użytkownik ${oldName} zmienił nazwę na: ${name}`);
            socket.emit(EVENTS.MESSAGE, `Zmieniłeś nazwę na ${name}`);
            socket.emit(EVENTS.USER, user.name);
            socket.broadcast.emit(EVENTS.USERS, Object.keys(users));
            socket.emit(EVENTS.USERS, Object.keys(users));
          }
        }
      }
    };
    const onRoom = async ({ token, room }) => {
      if (!user.logged) {
        socket.emit(EVENTS.ERROR, `Tylko zalogowani użytkownicy mogą zmieniać pokój`);
      } else {
        const oldRoom = user.room;
        const verified = await verifyUser(token);
        console.log(['socket.on'], EVENTS.ROOM, { room });

        if (verified) {
          if (rooms.indexOf(room) < 0) {
            rooms.push(room);
            socket.broadcast.emit(EVENTS.ROOMS, rooms);
            socket.emit(EVENTS.ROOM, room);
            io.local.emit(EVENTS.ROOMS, rooms);
            io.sockets.emit(EVENTS.ROOMS, rooms);
          }

          user.room = room;
          socket.leave(oldRoom, () => {
            socket.broadcast.to(oldRoom).emit(EVENTS.MESSAGE, `Użytkownik ${user.name} opuścił pokój`);
          });
          socket.join(room, () => {
            socket.broadcast.to(room).emit(EVENTS.MESSAGE, `Użytkownik ${user.name} dołączył do pokoju`);
            socket.emit(EVENTS.MESSAGE, `Zmieniłeś pokój na ${room}`);
          });
        }
      }
    };
    const onPM = async ({ token, userName, message }) => {
      if (!user.logged) {
        socket.emit(EVENTS.ERROR, `Tylko zalogowani użytkownicy mogą wysyłać prywatne wiadomości`);
      } else {
        const userTo = users[userName];
        const verified = await verifyUser(token);
        console.log(['socket.on'], EVENTS.PM, { userName, message });

        if (verified) {
          if (userTo) {
            socket.to(userTo.id).emit(EVENTS.PM, `Użytkownik ${user.name} wysłał Ci prywatną wiadomość o treści: ${message}`);
            socket.emit(EVENTS.PM, `Prywatna wiadomość do ${userName}: ${message}`);
          } else {
            socket.emit(EVENTS.PM, `Nie można wysłać wiadomości do użytkownika ${userName}`);
          }
        } else {
          socket.emit(EVENTS.ERROR, `Tylko zalogowani użytkownicy mogą wysyłać prywatne wiadomości`);
        }
      }
    };
    const onDisconnect = () => {
      console.log(['io.on'], EVENTS.DISCONNECT, connected);
      io.clients((error, users) => {
        socket.broadcast.emit(EVENTS.MESSAGE, `Użytkownik ${user.name} rozłączył się`);
        socket.broadcast.emit(EVENTS.USERS, users);
      });

      delete connected[socket.id];
      delete users[user.name];
    };
    const onMessage = ({ message }) => {
      console.log(['socket.on'], EVENTS.MESSAGE, { message });
      logUserMessage(user, message);

      io.sockets.in(user.room).emit(EVENTS.MESSAGE, `${user.name}: ${message}`);
    };
    const onLogin = async ({ name, password }) => {
      console.log(['socket.on'], EVENTS.LOGIN, { name, password });
      if (user.logged) {
        socket.emit(EVENTS.ERROR, `Użytkownik jest już zalogowany`);
      } else {
        const token = await login({ name, password });

        if (token) {
          const oldName = user.name;
          user.name = name;
          user.logged = true;
          users[name] = user;
          delete users[oldName];

          socket.emit(EVENTS.LOGGED, token);
          socket.emit(EVENTS.MESSAGE, `Zalogowano pomyślnie`);
          socket.emit(EVENTS.USER, user.name);
          socket.emit(EVENTS.USERS, Object.keys(users));
          socket.broadcast.emit(EVENTS.USERS, Object.keys(users));
          socket.broadcast.emit(EVENTS.MESSAGE, `Użytkownik ${oldName} zalogował się jako ${name}`);
        }
      }
    };
    const onRegister = async ({ name, password }) => {
      console.log(['socket.on'], EVENTS.REGISTER, { name, password });
      if (user.logged) {
        socket.emit(EVENTS.ERROR, `Rejestracja możliwa tylko dla niezalogowanych użytkowników`);
      } else {
        const token = await register({name, password});

        if (token) {
          const oldName = user.name;
          user.name = name;
          user.logged = true;
          users[name] = user;
          delete users[oldName];

          socket.emit(EVENTS.LOGGED, token);
          socket.emit(EVENTS.MESSAGE, `Zarejestrowano pomyślnie`);
          socket.emit(EVENTS.MESSAGE, `Automatyczne logowanie`);
          socket.emit(EVENTS.USER, user.name);
          socket.emit(EVENTS.USERS, Object.keys(users));
          socket.broadcast.emit(EVENTS.USERS, Object.keys(users));
          socket.broadcast.emit(EVENTS.MESSAGE, `Użytkownik ${oldName} zalogował się jako ${name}`);
        } else {
          socket.emit(EVENTS.ERROR, `Rejestracja nie powiodła się`);
          socket.emit(EVENTS.ERROR, `Nazwy użytkownika zajęta`);
        }
      }
    };

    // join room and emit initial data
    socket.join(user.room);
    socket.emit(EVENTS.ROOM, user.room);
    socket.emit(EVENTS.ROOMS, rooms);
    socket.emit(EVENTS.USER, user.name);
    socket.emit(EVENTS.USERS, Object.keys(users));
    socket.broadcast.emit(EVENTS.USERS, Object.keys(users));
    socket.broadcast.emit(EVENTS.MESSAGE, `Użytkownik ${user.name} połączył się`);

    // handle sockets events
    socket.on(EVENTS.DISCONNECT, onDisconnect);
    socket.on(EVENTS.MESSAGE, onMessage);
    socket.on(EVENTS.NAME, onName);
    socket.on(EVENTS.LOGIN, onLogin);
    socket.on(EVENTS.PM, onPM);
    socket.on(EVENTS.REGISTER, onRegister);
    socket.on(EVENTS.ROOM, onRoom);
  });
};
