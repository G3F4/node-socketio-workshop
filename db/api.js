const sqlite = require('sqlite/legacy');

const logUserMessage = async (user, message, room) => {
  console.log(['db.logUserMessage'], user, message, room);
  const db = await sqlite.open('chat.db');

  await db.run(`INSERT into messages(user, message, room, timestamp) VALUES ('${user}', '${message}', '${room}','${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}')`);

  const messages = await db.all(`SELECT * from messages`);
};

exports.logUserMessage = logUserMessage;