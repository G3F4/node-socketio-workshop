const sqlite = require('sqlite');

const addUser = async ({ name, passwordHash }) => {
  console.log(['db.addUser'], { name, passwordHash });
  try {
    const db = await sqlite.open('chat.db');

    return await db.run(`INSERT into users(name, passwordHash) VALUES ('${name}', '${passwordHash}')`);
  }

  catch(error) {
    console.log(['api.addUser.error'], error);
  }
};

const getUser = async (name) => {
  console.log(['db.getUser'], name);
  try {
    const db = await sqlite.open('chat.db');
    const [user] = await db.all(`SELECT * FROM users WHERE name='${name}'`);
    console.log(['db.getUser.user'], user);
    return user;
  }

  catch(error) {
    console.log(['api.getUser.error'], error);
  }
};

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
  addUser,
  getUser,
  logUserMessage,
};
