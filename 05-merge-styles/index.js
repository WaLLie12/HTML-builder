const fs = require('fs/promises');
const path = require('path');
const stylesDir = path.join(__dirname, 'styles');
const outputFile = path.join(__dirname, 'project-dist', 'bundle.css');

async function addStyle() {
  try {
    const files = await fs.readdir(stylesDir);

    const cssFiles = files.filter((file) => file.endsWith('.css'));

    const array = [];

    for (const cssFile of cssFiles) {
      const filePath = path.join(stylesDir, cssFile);
      // console.log(filePath);
      const fileContent = await fs.readFile(filePath);
      const fileContentString = fileContent.toString('utf-8');
      array.push(fileContentString);
    }
    // console.log(array)

    await fs.writeFile(outputFile, array.join('\n'));

    console.log('Bob\'s your uncle!');
  } catch (error) {
    console.error(error.message);
  }
}

addStyle();
