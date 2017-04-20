const DEFAULT_NAME = 'Bezimienny';
const DEFAULT_ROOM = 'Poczekalnia';
const EVENTS = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  ERROR: 'errors',
  USER: 'user',
  USERS: 'users',
  LOGIN: 'login',
  LOGGED: 'logged',
  REGISTER: 'register',
  REGISTERED: 'registered',
  ROOM: 'room',
  ROOMS: 'rooms',
  MESSAGE: 'message',
  NAME: 'name',
  COMMAND: 'command',
  PM: 'pm'
};

module.exports = {
  DEFAULT_ROOM,
  DEFAULT_NAME,
  EVENTS,
};
