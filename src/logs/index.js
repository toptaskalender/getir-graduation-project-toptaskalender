const fs    = require('fs');
const path  = require('path');

// Create a write stream in append mode
const requestLogStream = fs.createWriteStream(
  path.join(__dirname, 'requests.log'),
  { flags: 'a' }
);

module.exports = {
  requestLogStream
}