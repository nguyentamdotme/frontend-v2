const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

const config = {
  // Entry points to the project
  entry: [
    'webpack/hot/dev-server',
    'webpack/hot/only-dev-server',
    path.join(__dirname, '/src/app/app.js'),
  ],
  proxy : [{path: /ws, target: ws:\/\/localhost:3001/, ws: true}],
  // Server Configuration options
  devServer: {
    contentBase: 'public', // Relative directory for base of server
    devtool: 'eval',
    disableHostCheck: true, // tam add
    hot: true, // Live-reload
    inline: true,
    port: 3001, // Port Number
    host: 'localhost', // Change to '0.0.0.0' for external facing server
  },
  devtool: 'eval',
  output: {
    path: buildPath, // Path of output file
    filename: 'app.js',
  },
  plugins: [
    // Enables Hot Modules Replacement
    new webpack.HotModuleReplacementPlugin(),
    // Allows error warnings but does not stop compiling.
    new webpack.NoErrorsPlugin(),
    // Moves files
    new TransferWebpackPlugin([
      {from: 'public'},
    ], path.resolve(__dirname, './')),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/, // All .js files
        loaders: ['babel-loader'],
        exclude: [nodeModulesPath],
      },

      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules',
        include: path.join(__dirname, 'node_modules'),
        include: /flexboxgrid/
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ],
  },
};

module.exports = config;
