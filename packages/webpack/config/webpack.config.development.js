const path = require("path");

/** @type {import("webpack").Configuration} */
module.exports = {
  mode: "development",
  devtool: "eval-cheap-source-map",
  performance: false,
  cache: true,
  output: {
    filename: "[name].js",
    chunkFilename: "[id].js",
  },
  optimization: {
    minimize: false,
  },
};
