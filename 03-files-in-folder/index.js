const fs = require('fs/promises');
const path = require('path');
const secretFolder = path.resolve(__dirname, 'secret-folder');

(async () => {
  try {
    const files = await fs.readdir(secretFolder, { withFileTypes: true });

    for (const file of files) {
      if (file.isFile()) {
        const filePath = path.join(secretFolder, file.name);
        const stats = await fs.stat(filePath);
        const fileSize = (stats.size / 1024).toFixed(3) + 'kb';

        console.log(
          `${file.name}-${path.extname(file.name)} - ${fileSize}`,
        );
      }
    }
  } catch (error) {
    console.error(error);
  }
})();
