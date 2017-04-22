import io from 'socket.io-client';

const socket = io(process.env.IO_HOST || 'http://localhost:30001'); // now the client connects to the server
let token = null;
const socketListener = update => {
  socket.on('connect', () => update({ connected: { $set: true } }));
  socket.on('message', message => update({ messages: { $push: [message] } }));
};
const socketEmitter = (event, value) => socket.emit(event, { token, ...value });

export { socketEmitter, socketListener };
