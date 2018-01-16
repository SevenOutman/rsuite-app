const path = require('path');
const webpack = require('webpack');
const commonPlugins = require('./webpack/plugins');
const commonRules = require('./webpack/rules');

module.exports = {
  entry: [
    path.join(__dirname, 'src/index')
  ],
  resolve: {
    alias: {
      react: path.resolve(__dirname, 'node_modules/@rsuite/framework/node_modules/react'),
    },
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  plugins: [
    ...commonPlugins,
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false // eslint-disable-line
      }
    }),
    new webpack.BannerPlugin({ banner: `Last update: ${new Date().toString()}` })
  ],
  module: {
    rules: [
      ...commonRules
    ]
  }
};
