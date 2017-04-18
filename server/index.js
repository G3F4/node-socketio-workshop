const app = require('express')();
const { resolve } = require('path');
const http = require('http').Server(app);
require('./socketio').listen(http);
require('../db/init');
const PORT = process.env.PORT || 30001;

app.get('/', (req, res) => res.sendFile(resolve(__dirname, '../index.html')));
http.listen(PORT, () => console.log([`listening on port ${PORT}`]));