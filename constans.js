const DEFAULT_NAME = 'Bezimienny';
const DEFAULT_ROOM = 'Poczekalnia';
const EVENTS = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  MESSAGE: 'message',
  ERROR: 'errors',
  USER: 'user',
  USERS: 'users',
  ROOM: 'room',
  ROOMS: 'rooms',
  NAME: 'name',
  PM: 'pm',
  LOGIN: 'login',
  LOGGED: 'logged',
  REGISTER: 'register',
  REGISTERED: 'registered',
};
const SECRET = 'Lubię placki';
const DEFAULT_SALT = 10;

module.exports = {
  EVENTS,
  DEFAULT_NAME,
  DEFAULT_ROOM,
  DEFAULT_SALT,
  SECRET,
};
