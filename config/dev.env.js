let merge = require('webpack-merge');
let baseConfig = require('./index.js');

module.exports = merge(baseConfig, {
  modernizer: {
    minify: {
      output: {
        comments: true,
        beautify: false
      }
    }
  },
  pathClean: {
    options: {
      watch:    true,
      verbose:  true
    }
  }
});
