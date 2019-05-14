let path = require('path');

/**
 * Base config object
 * @type {{modernizer: {filename: string}, pathClean: {paths: string[], options: {root: void | * | {modules, extensions}, dry: boolean}}}}
 */
module.exports = {
  cssSourceMap: true,
  modernizer: {
    filename: 'assets/javascripts/modernizer.js',
  },
  pathClean: {
    paths: [
      '.tmp'
    ],
    options: {
      root: path.resolve(__dirname, '../'),
      dry: false
    }
  }
};
