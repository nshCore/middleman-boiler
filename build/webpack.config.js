let path = require('path');
let webpack = require('webpack');
let ManifestPlugin = require('webpack-manifest-plugin');
let ProgressBarPlugin = require('progress-bar-webpack-plugin');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let FaviconsWebpackPlugin = require('favicons-webpack-plugin');

/**
 * resolve root directory
 *
 * @param dir
 * @returns {*|string}
 */
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

/**
 * Base WebPack Object
 * @type {{devtool: string, plugins: *[], entry: {site: *|string, styles: *|string}, resolve: {modules: *[], extensions: string[]}, output: {path: *|string, filename: string}, module: {loaders: *[]}}}
 */
module.exports = {
  devtool: '#cheap-module-eval-source-map',

  entry: {
    site: resolve('/source/assets/javascripts/_site.js'),
    styles: resolve('/source/assets/stylesheets/_all.scss'),
  },

  resolve: {
    modules: [
      resolve('/node_modules'),
      resolve('/source/assets/fonts'),
      resolve('/source/assets/images'),
      resolve('/source/assets/javascripts'),
      resolve('/source/assets/stylesheets'),
    ],
    extensions: ['.js', '.css', '.scss', '.sass']
  },

  resolve: {
    alias: {
      'waypoints': 'waypoints/lib/jquery.waypoints.min.js'
    }
  },

  plugins: [
    new ProgressBarPlugin({
      format: ' [:bar] ' + ':percent'.bold + ' (:msg)'
    }),
    new  webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new ExtractTextPlugin("assets/stylesheets/[name].bundle.css"),
    new FaviconsWebpackPlugin({
      // Your source logo
      logo: resolve('source/assets/images/favicon.png'),
      // The prefix for all image files (might be a folder or a name)
      prefix: 'assets/images/icons/',
      // Emit all stats of the generated icons
      emitStats: true,
      // The name of the json containing all favicon information
      statsFilename: 'assets/images/icons/iconstats-[hash].json',
      // Generate a cache file with control hashes and
      // don't rebuild the favicons until those hashes change
      persistentCache: true,
      // Inject the html into the html-webpack-plugin
      inject: false,
      // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
      background: '#132D4E',
      // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
      title: 'atlascity.io',

      // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: true,
        favicons: true,
        firefox: true,
        opengraph: true,
        twitter: true,
        yandex: true,
        windows: true
      }
    }),
    new ManifestPlugin({
      fileName: 'webpack-asset-manifest.json',
      basePath: resolve(''),
      stripSrc: false
    })
  ],

  output: {
    path: resolve('/.tmp/dist'),
    filename: 'assets/javascripts/[name].bundle.js?[hash]',
  },

  module: {
    loaders: [
      {
        test: /source\/assets\/javascripts\/.*\.js$/,
        exclude: /node_modules|\.tmp|vendor/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0']
        },
      },
      {
        test: /source\/assets\/stylesheets\/.*\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: function () {
                  return [
                    require('autoprefixer')
                  ];
                }
              }
            }
          ]
        }),
      },
      {
        test: /source\/assets\/stylesheets\/.*\.scss$|.sass$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'resolve-url-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: function () {
                  return [
                    require('autoprefixer')
                  ];
                }
              }
            },
            'sass-loader?sourceMap'
          ]
        }),
      },
      {
        test: /source\/assets\/images\/.*\.png$|.svg$|.jpg$|.jpeg$|.gif$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '/assets/images/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 50000,
              mimetype: 'application/font-woff',
              name: '/assets/fonts/[name].[ext]?[hash]'
            }
          }
        ]
      },
      {
        test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 50000,
              mimetype: 'application/font-woff2',
              name: '/assets/fonts/[name].[ext]?[hash]'
            }
          }
        ]
      },
      {
        test: /\.ttf(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 50000,
              mimetype: 'application/octet-stream',
              name: '/assets/fonts/[name].[ext]?[hash]'
            }
          }
        ]
      },
      {
        test: /\.otf(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 50000,
              mimetype: 'font/opentype',
              name: '/assets/fonts/[name].[ext]?[hash]'
            }
          }
        ]
      },
      {
        test: /\.(eot|svg)(\?\S*)?$/,
        loader: 'url-loader',
        options: {
          limit: 50000,
          name: '/assets/fonts/[name].[ext]?[hash]'
        }
      }
    ],
  }
};
