import io from 'socket.io-client';

const socket = io(process.env.IO_HOST || 'http://localhost:30001'); // now the client connects to the server
let token = null;
const socketListener = update => {
  socket.on('connect', () => update({ connected: { $set: true } }));
  socket.on('message', message => update({ messages: { $push: [message] } }));
  socket.on('errors', message => update({ messages: { $push: [message] } }));
  socket.on('pm', message => update({ messages: { $push: [message] } }));
  socket.on('logged', auth => { token = auth; });
  socket.on('user', user => update({ user: { $set: user } }));
  socket.on('room', room => update({ room: { $set: room } }));
  socket.on('users', users => update({ users: { $set: users } }));
  socket.on('rooms', rooms => update({ rooms: { $set: rooms } }));
};
const socketEmitter = (event, value) => socket.emit(event, { token, ...value });

export { socketEmitter, socketListener };
