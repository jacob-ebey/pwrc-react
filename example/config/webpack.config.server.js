const path = require("path");

const { merge } = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");

const PWRCPlugin = require("@pwrc/webpack");

const common = require("./webpack.config.common");

module.exports = merge(common, {
  target: "node",
  externals: [
    nodeExternals({
      allowlist: [
        "@pwrc/app",
        "@pwrc/document",
        "@pwrc/express",
        "@pwrc/prerender",
        "@pwrc/static",
        "@pwrc/vercel",
      ],
      additionalModuleDirs: ["../node_modules"],
    }),
  ],
  entry: {
    express: "./src/express.js",
    static: "./src/static.js",
    vercel: "./src/vercel.js",
  },
  output: {
    path: path.resolve("./dist"),
    libraryTarget: "commonjs",
    filename: "[name].js",
    chunkFilename: "[id].js",
  },
  performance: false,
  plugins: [
    new PWRCPlugin({
      ssr: true,
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
          {
            loader: "css-loader",
            options: {
              modules: { exportOnlyLocals: true },
            },
          },
          "postcss-loader",
        ],
      },
      {
        include: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          { loader: "css-loader", options: { importLoaders: 1 } },
          "postcss-loader",
        ],
      },
    ],
  },
});
