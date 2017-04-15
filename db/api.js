const sqlite = require('sqlite/legacy');

const logUserMessage = async (user, message, room) => {
  console.log(['db.logUserMessage'], user, message, room);
  let db = null;
  try {
    db = await sqlite.open('chat.db');
  }

  catch(e) {
    console.log(['error opening db'], e);
  }

  try {
    await db.run(`INSERT into messages(user, message, room, timestamp) VALUES ('${user}', '${message}', '${room}','${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}')`);
  }

  catch(e) {
    console.log(['error writing to db'], e);
  }
};

exports.logUserMessage = logUserMessage;