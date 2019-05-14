let merge = require('webpack-merge');
let baseConfig = require('./index.js');

module.exports = merge(baseConfig, {
  modernizer: {
    minify: {
      output: {
        comments: false,
        beautify: false
      }
    }
  },
  pathClean: {
    options: {
      watch: false,
      verbose: false,
    }
  }
});
