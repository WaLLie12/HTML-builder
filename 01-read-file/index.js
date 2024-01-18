const fs = require('node:fs');
const path = require('node:path');

const stream = fs.createReadStream(path.resolve(__dirname, 'text.txt'));
stream.on('data', (chunk) => {
  console.log(chunk.toString());
});
