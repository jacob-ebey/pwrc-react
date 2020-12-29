const path = require("path");

const NodemonPlugin = require("nodemon-webpack-plugin");
const { merge } = require("webpack-merge");

const clientConfig = require("./webpack.config.client");
const serverConfig = require("./webpack.config.server");

const devConfig = {
  mode: "development",
  devtool: "eval-cheap-source-map",
  performance: false,
  cache: {
    type: "filesystem",
  },
  output: {
    filename: "[name].js",
    chunkFilename: "[id].js",
  },
  optimization: {
    minimize: false,
  },
};

const distDir = path.resolve(__dirname, "../dist");
const expressFile = path.resolve(distDir, "express.js");
module.exports = [
  merge(clientConfig, devConfig),
  merge(serverConfig, devConfig, {
    plugins: [
      new NodemonPlugin({
        script: expressFile,
        watch: path.resolve(distDir),
      }),
    ],
  }),
];
