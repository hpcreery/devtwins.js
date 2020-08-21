const { generateTheme } = require('antd-theme-generator');
const path = require('path')

const options = {
  antDir: path.join(__dirname, '../../node_modules/antd'),
  stylesDir: path.join(__dirname, '../../src'), // all files with .less extension will be processed
  //  varFile: path.join(__dirname, './src/styles/variables.less'), // default path is Ant Design default.less file
  varFile: path.join(__dirname, '../../node_modules/antd/lib/style/themes/default.less'),
  themeVariables: ['@primary-color'],
  outputFilePath: path.join(__dirname, '../../public/dynamiccolor.less') // if provided, file will be created with generated less/styles
  // customColorRegexArray: [/^fade\(.*\)$/], // An array of regex codes to match your custom color variable values so that code can identify that it's a valid color. Make sure your regex does not adds false positives.
}

generateTheme(options).then(less => {
  console.log('Theme generated successfully');
})
.catch(error => {
  console.log('Error', error);
})