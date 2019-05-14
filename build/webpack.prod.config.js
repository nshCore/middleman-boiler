let path = require('path');
let glob = require('glob');
let webpack = require('webpack');
let merge = require('webpack-merge');
let Clean = require('clean-webpack-plugin');
let prodConfig = require('../config/prod.env');
let PurifyCSSPlugin = require('purifycss-webpack');
let baseWebpackConfig = require('./webpack.config');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let modernizerConfig = require('../config/modernizer.config');
let ModernizrWebpackPlugin = require('modernizr-webpack-plugin');
let OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
  plugins: [
    new Clean(prodConfig.pathClean.paths, prodConfig.pathClean.options),
    new ModernizrWebpackPlugin(merge(modernizerConfig, prodConfig.modernizer)),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    new OptimizeCSSPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        discardComments: { removeAll: true } },
      canPrint: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: prodConfig.cssSourceMap,
      minimize: true,
      compress: {
        warnings: true,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      output: {
        comments: false
      }
    }),
    new CopyWebpackPlugin([
      { from: path.join(__dirname,'..','/source/assets/images'), to: 'assets/images' },
      { from: path.join(__dirname,'..','/source/assets/fonts'), to: 'assets/fonts' },
    ])
  ]
});
