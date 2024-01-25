const fs = require('fs/promises');
const path = require('path');

const storeDir = path.join(__dirname, 'files');
const pasteDir = path.join(__dirname, 'files-copy');

async function duplicateDir() {
  try {
    await fs.mkdir(pasteDir, { recursive: true });

    const sourceFiles = await fs.readdir(storeDir);
    const destFiles = await fs.readdir(pasteDir);

    const filesToDelete = destFiles.filter(file => !sourceFiles.includes(file));
    for (const fileToDelete of filesToDelete) {
      const deletePath = path.join(pasteDir, fileToDelete);
      await fs.unlink(deletePath);
    }

    for (const file of sourceFiles) {
      const sourcePath = path.join(storeDir, file);
      const destPath = path.join(pasteDir, file);

      const sourceStats = await fs.stat(sourcePath);
      const destStats = destFiles.includes(file) ? await fs.stat(destPath) : null;

      if (!destStats || sourceStats.mtimeMs > destStats.mtimeMs) {
        const fileContent = await fs.readFile(sourcePath);
        await fs.writeFile(destPath, fileContent);
      }
    }

    console.log('The folder is definitely updated! Check it out!');
  } catch (error) {
    console.error(error.message);
  }
}

duplicateDir();
