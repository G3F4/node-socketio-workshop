const DEFAULT_NAME = 'Bezimienny';
const DEFAULT_ROOM = 'Poczekalnia';
const EVENTS = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  ERROR: 'errors',
  USER: 'user',
  USERS: 'users',
  ROOM: 'room',
  ROOMS: 'rooms',
  MESSAGE: 'message',
  NAME: 'name',
  PM: 'pm',
};

module.exports = {
  DEFAULT_ROOM,
  DEFAULT_NAME,
  EVENTS,
};
