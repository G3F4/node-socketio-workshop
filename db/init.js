const sqlite = require('sqlite/legacy');

(async () => {
  const db = await sqlite.open('chat.db');

  await db.run(`CREATE TABLE if not exists messages (user TEXT, message TEXT, room TEXT, timestamp TEXT)`);
})();
