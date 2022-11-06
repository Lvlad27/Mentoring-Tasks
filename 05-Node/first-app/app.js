const path = require('path');

const pathObj = path.parse(__filename);
// console.log(pathObj);

const os = require('os');
let totalMemory = os.totalmem();
let freeMemory = os.freemem();

// console.log('🚀 ~ file: app.js ~ line 8 ~ totalMemory', totalMemory);
// console.log('🚀 ~ file: app.js ~ line 10 ~ freeMemory', freeMemory);

const fs = require('fs');
const files = fs.readdirSync('./');
// console.log('🚀 ~ file: app.js ~ line 15 ~ files', files);

// fs.readdir('$', function (err, files) {
//   if (err) console.log('Error', err);
//   else console.log('Result', files);
// });

const Logger = require('./logger');
const logger = new Logger();

// Register a listener
logger.on('messageLogged', (e) => {
  console.log('Listener called', e);
});

logger.log('message');
