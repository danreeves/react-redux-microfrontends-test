const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackPluginServe: Serve } = require("webpack-plugin-serve");
const argv = require("webpack-nano/argv");

const { prod } = argv;

const outputPath = path.resolve("./dist");
const serverOptions = {
  historyFallback: true,
  hmr: false,
  liveReload: true,
  port: 3000,
  static: [outputPath],
};

const entry = [
  "./src/app-shell.js",
  !prod && "webpack-plugin-serve/client", // ← important: this is required, where the magic happens in the browser
].filter(Boolean);

const plugins = [
  new HtmlWebpackPlugin(),
  !prod && new Serve(serverOptions),
].filter(Boolean);

module.exports = {
  entry,
  output: {
    filename: "app-shell.js",
    path: outputPath,
    publicPath: prod ? "/react-redux-microfrontends-test/" : "/",
    chunkFilename: "[name].[hash].bundle.js",
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    esmodules: true,
                  },
                },
              ],
              "@babel/preset-react",
            ],
          },
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      name: true,
    },
  },
  mode: prod ? "production" : "development",
  watch: !prod,
};
