const sqlite = require('sqlite');

const logUserMessage = async ({ name, room}, message) => {
  console.log(['db.logUserMessage'], { name, room}, message);
  try {
    const db = await sqlite.open('chat.db');
    await db.run(`INSERT into messages(user, message, room, timestamp) VALUES ('${name}', '${message}', '${room}','${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}')`);
  }

  catch(error) {
    console.log(['api.logUserMessage.error'], error);
  }
};

module.exports = {
  logUserMessage,
};
