let path = require('path');
let webpack = require('webpack');
let merge = require('webpack-merge');
let Clean = require('clean-webpack-plugin');
let devConfig = require('../config/dev.env');
let baseWebpackConfig = require('./webpack.config');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let modernizerConfig = require('../config/modernizer.config');
let ModernizrWebpackPlugin = require('modernizr-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
  plugins: [
    new Clean(devConfig.pathClean.paths, devConfig.pathClean.options),
    new ModernizrWebpackPlugin(merge(modernizerConfig, devConfig.modernizer)),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    new CopyWebpackPlugin([
      { from: path.join(__dirname,'..','/source/assets/images'), to: 'assets/images' },
      { from: path.join(__dirname,'..','/source/assets/fonts'), to: 'assets/fonts' },
    ])
  ]
});
