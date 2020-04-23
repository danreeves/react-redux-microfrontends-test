const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');

const outputPath = path.resolve('./dist');;
const serverOptions = {
  historyFallback: true,
  hmr: false,
  liveReload: true,
  port: 3000,
  static: [outputPath],
}

module.exports = {
  entry: [
    './src/app-shell.js',
    'webpack-plugin-serve/client' // ← important: this is required, where the magic happens in the browser
  ],
  output: {
    filename: 'app-shell.js',
    path: outputPath,
    publicPath: "/",
    chunkFilename: '[name].[hash].bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new Serve(serverOptions)
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env',
              {
                targets: {
                  esmodules: true,
                },
              },
            ], '@babel/preset-react']
          }
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: true
    }
  },
  mode: 'development',
  watch: true  // ← important: webpack and the server will continue to run in watch mode
};
