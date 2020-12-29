const { ESBuildPlugin, ESBuildMinifyPlugin } = require("esbuild-loader");
const { DefinePlugin, ProgressPlugin } = require("webpack");

/** @type {import("webpack").Configuration} */
module.exports = {
  mode: "production",
  devtool: "cheap-source-map",
  output: {
    filename: "[name].[contenthash].js",
    chunkFilename: "[id].[contenthash].js",
  },
  optimization: {
    minimizer: [
      new ESBuildMinifyPlugin({
        target: "es2015",
      }),
    ],
  },
  plugins: [
    new ProgressPlugin(),
    new ESBuildPlugin(),
    new DefinePlugin({
      NODE_ENV: process.env.NODE_ENV || "production",
      BASE_PATH: JSON.stringify(process.env.BASE_PATH || ""),
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        include: /\.jsx?/,
        exclude: /node_modules/,
        use: [
          {
            loader: "esbuild-loader",
            options: {
              loader: "jsx",
              target: "es2015",
            },
          },
        ],
      },
    ],
  },
};
