const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { merge } = require("webpack-merge");

const PWRCPlugin = require("@pwrc/webpack");

const common = require("./webpack.config.common");

module.exports = merge(common, {
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(process.cwd(), "public/static"),
    publicPath: process.env.BASE_PATH
      ? (process.env.BASE_PATH.endsWith("/")
          ? process.env.BASE_PATH.slice(0, -1)
          : process.env.BASE_PATH) + "/static/"
      : "/static/",
  },
  performance: {
    assetFilter: function (assetFilename) {
      return !assetFilename.endsWith("stats.json");
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    }),
    new PWRCPlugin({
      shell: {
        app: path.resolve(process.cwd(), "src/app.jsx"),
        document: path.resolve(process.cwd(), "src/document.jsx"),
      },
    }),
  ],
  module: {
    rules: [
      {
        include: /\.module\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
          "postcss-loader",
        ],
      },
      {
        include: /\.css$/,
        exclude: /\.module\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },
});
