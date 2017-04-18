// podczas odpalania kodu transpilowanego babelem potrzebujemy werjsę legacy
const sqlite = require(process.env.BABEL ? 'sqlite/legacy' : 'sqlite');

const addUser = async ({ name, passwordHash }) => {
  console.log(['db.addUser'], { name, passwordHash });
  let db = null;
  try {
    db = await sqlite.open('chat.db');
  }

  catch(e) {
    console.log(['error opening db'], e);
  }

  try {
    const [registeredUser] = await db.all(`SELECT * FROM users WHERE name='${name}'`);
    console.log(['db.addUser.registeredUser'], registeredUser);

    if (registeredUser) {
      return false;
    }

    await db.run(`INSERT into users(name, passwordHash) VALUES ('${name}', '${passwordHash}')`);

    return true;
  }

  catch(e) {
    console.log(['error writing to db'], e);
  }
};

const getUser = async (name) => {
  console.log(['db.getUser'], name);
  let db = null;
  try {
    db = await sqlite.open('chat.db');
  }

  catch(e) {
    console.log(['error opening db'], e);
  }

  try {
    const [user] = await db.all(`SELECT * FROM users WHERE name='${name}'`);
    console.log(['db.getUser.user'], user);

    return user;
  }

  catch(e) {
    console.log(['error writing to db'], e);
  }
};

const logUserMessage = async ({ name, room}, message) => {
  console.log(['db.logUserMessage'], { name, room}, message);
  let db = null;
  try {
    db = await sqlite.open('chat.db');
  }

  catch(e) {
    console.log(['error opening db'], e);
  }

  try {
    await db.run(`INSERT into messages(user, message, room, timestamp) VALUES ('${name}', '${message}', '${room}','${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}')`);
  }

  catch(e) {
    console.log(['error writing to db'], e);
  }
};

exports.addUser = addUser;
exports.getUser = getUser;
exports.logUserMessage = logUserMessage;
