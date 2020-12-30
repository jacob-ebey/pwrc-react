const fs = require("fs");
const path = require("path");

const { merge } = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");

const PWRCPlugin = require("@pwrc/webpack");

const requestFilepath = require("./request-filepath");
const common = require("./webpack.config.common");

const hasPostcssConfig = fs.existsSync(
  path.resolve(process.cwd(), "postcss.config.js")
);

const serverPath = requestFilepath(path.resolve(process.cwd(), "src/server"));
const documentPath =
  requestFilepath(path.resolve(process.cwd(), "src/document")) ||
  requestFilepath(path.resolve(__dirname, "../lib/runtime/document"));

module.exports = merge(common, {
  target: "node",
  ...(serverPath ? { entry: { server: serverPath } } : {}),
  output: {
    path: path.resolve(process.cwd(), "dist"),
    libraryTarget: "commonjs",
    filename: "[name].js",
    chunkFilename: "[id].js",
  },
  performance: false,
  plugins: [
    new PWRCPlugin({
      ssr: true,
      shell: {
        app: requestFilepath(path.resolve(process.cwd(), "src/app")),
        document: documentPath,
      },
    }),
  ],
  module: {
    rules: [
      {
        include: /\.module\.css$/,
        use: [
          {
            loader: "css-loader",
            options: {
              modules: { exportOnlyLocals: true },
            },
          },
        ].concat(hasPostcssConfig ? ["postcss-loader"] : []),
      },
      {
        include: /\.css$/,
        exclude: /\.module\.css$/,
        use: [{ loader: "css-loader", options: { importLoaders: 1 } }].concat(
          hasPostcssConfig ? ["postcss-loader"] : []
        ),
      },
    ],
  },
});
