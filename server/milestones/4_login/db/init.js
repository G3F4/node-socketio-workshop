const sqlite = require('sqlite');

(async () => {
  console.log(['db.init']);
  try {
    const db = await sqlite.open('chat.db');
    await db.run(`CREATE TABLE if not exists messages (user TEXT, message TEXT, room TEXT, timestamp TEXT)`);
  }

  catch(error) {
    console.log(['db.init.error'], error);
  }
})();
