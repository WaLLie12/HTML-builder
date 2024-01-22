const fs = require('fs/promises');
const path = require('path');
const storeDir = path.join(__dirname, 'files');
const pasteDir = path.join(__dirname, 'files-copy');

async function duplicateDir() {
  try {
    await fs.mkdir(pasteDir, { recursive: true });
    const files = await fs.readdir(storeDir);

    for (const file of files) {
      const sourcePath = path.join(storeDir, file);
      const pasteWay = path.join(pasteDir, file);

      const fileContent = await fs.readFile(sourcePath);

      await fs.writeFile(pasteWay, fileContent);
    }

    console.log('The folder is definitely copied! Check it out!');
  } catch (error) {
    console.error(error.message);
  }
}

duplicateDir();
