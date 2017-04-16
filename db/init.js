// podczas odpalania kodu transpilowanego babelem potrzebujemy werjsę legacy
const sqlite = require(process.env.BABEL ? 'sqlite/legacy' : 'sqlite');

(async () => {
  let db = null;
  try {
    db = await sqlite.open('chat.db');
  }

  catch(e) {
    console.log(['error opening db'], e);
  }

  try {
    await db.run(`CREATE TABLE if not exists messages (user TEXT, message TEXT, room TEXT, timestamp TEXT)`);
  }

  catch(e) {
    console.log(['error creating table'], e);
  }
})();
