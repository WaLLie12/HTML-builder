const fs = require('fs');
const path = require('path');
const createFolder = path.resolve(__dirname, 'text.text')

const text2 = fs.createWriteStream(createFolder);
process.stdout.write('Good day. Please, enter the text right below\n');
process.stdin.on('data', function (data) {
  if (data.toString().replace(/\r?\n|\r/g, '') === 'exit') {
    leaveSoon();
  }
  
  fs.appendFile(createFolder, data.toString(), (error) => {
    if (error) {
      console.log(error.message);
    }
  })
  
});

process.on('SIGINT', leaveSoon);

function leaveSoon() {
  process.stdout.write('Leave soon? bye');
    process.exit();
}
