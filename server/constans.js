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
const SECRET = 'Lubię placki';
const DEFAULT_SALT = 10;

exports.DEFAULT_NAME = DEFAULT_NAME;
exports.DEFAULT_ROOM = DEFAULT_ROOM;
exports.DEFAULT_SALT = DEFAULT_SALT;
exports.EVENTS = EVENTS;
exports.SECRET = SECRET;
