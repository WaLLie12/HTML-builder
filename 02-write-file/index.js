const fs = require('fs');
const path = require('path');

const text2 = fs.createWriteStream(path.resolve(__dirname, 'text.text'));
process.stdout.write('Good day. Please, enter the text right below\n');
process.stdin.on('data', function (data) {
  data = data.toString().toLowerCase();
  text2.write(data);
  if (data.trim() === 'exit') {
    leaveSoon();
  }
});

process.on('SIGINT', leaveSoon);

function leaveSoon() {
  process.stdout.write('Leave soon? bye');
  setTimeout(() => {
    process.exit();
  }, 500);
}
