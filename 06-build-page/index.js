const fsPromises = require('fs/promises');
const path = require('path');

const templateFile = path.resolve(__dirname, 'template.html');
const componentsDir = path.resolve(__dirname, 'components');
const stylesDir = path.resolve(__dirname, 'styles');
const assetsDir = path.resolve(__dirname, 'assets');
const outputDir = path.resolve(__dirname, 'project-dist');

async function buildPage() {
  try {
    await fsPromises.mkdir(outputDir, { recursive: true });

    const templateContent = await fsPromises.readFile(templateFile, 'utf8');
    const compiledTemplate = await replaceTemplateTags(templateContent);

    await fsPromises.writeFile(
      path.join(outputDir, 'index.html'),
      compiledTemplate,
    );

    await mergeStyles(stylesDir, path.join(outputDir, 'style.css'));
    await copyDirectory(assetsDir, path.join(outputDir, 'assets'));

    console.log('Page built successfully!');
  } catch (error) {
    console.error('Error building page:', error);
  }
}

async function replaceTemplateTags(template) {
  const tagRegex = /\{\{([^}]+)\}\}/g; 

  let replacedTemplate = template;

  const promises = [];

  replacedTemplate.replace(tagRegex, (match, componentName) => {
    const componentPath = path.join(componentsDir, componentName + '.html');
    const componentPromise = fsPromises.readFile(componentPath, 'utf8')
      .then((componentContent) => ({ match, componentContent }))
      .catch((error) => {
        console.error(`Error loading component "${componentName}":`, error);
        return { match, componentContent: match }; 
      });

    promises.push(componentPromise);
  });

  const componentsContents = await Promise.all(promises);

  for (const { match, componentContent } of componentsContents) {
    replacedTemplate = replacedTemplate.replace(match, componentContent);
  }

  return replacedTemplate;
}

async function mergeStyles(stylesDir, outputFile) {
  try {
    const files = await fsPromises.readdir(stylesDir);
    const cssFiles = files.filter((file) => file.endsWith('.css'));

    const styles = [];

    for (const cssFile of cssFiles) {
      const filePath = path.join(stylesDir, cssFile);
      const fileContent = await fsPromises.readFile(filePath, 'utf-8');
      styles.push(fileContent);
    }

    const joinedStyles = styles.join('\n');
    await fsPromises.writeFile(outputFile, joinedStyles);

    console.log('Bob\'s your uncle!');
  } catch (error) {
    console.error(error.message);
  }
}

async function copyDirectory(sourceDir, destinationDir) {
  try {
    await fsPromises.mkdir(destinationDir, { recursive: true });

    const files = await fsPromises.readdir(sourceDir);

    for (const file of files) {
      const sourcePath = path.join(sourceDir, file);
      const destinationPath = path.join(destinationDir, file);

      const stats = await fsPromises.lstat(sourcePath);

      if (stats.isDirectory()) {
        await copyDirectory(sourcePath, destinationPath);
      } else {
        const fileContent = await fsPromises.readFile(sourcePath);
        await fsPromises.writeFile(destinationPath, fileContent);
      }
    }
  } catch (error) {
    console.error(
      error.message
    );
  }
}

buildPage();
