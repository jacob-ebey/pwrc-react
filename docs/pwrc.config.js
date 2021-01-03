const expressDev = require("@pwrc/express/dev");
const nodeExternals = require("@pwrc/webpack/node-externals");


module.exports = {
  /**
   *
   * @param {import("webpack").Configuration} config
   * @param {{ webpack: import("webpack") }} param1
   */
  webpack(config, { server, dev, webpack: { DefinePlugin } }) {
    config.plugins.push(
      new DefinePlugin({
        FAUNA_PUBLIC_KEY: JSON.stringify(process.env.FAUNA_PUBLIC_KEY),
      })
    );

    if (server) {
      config.entry = {
        express: "./src/express.js",
        vercel: "./src/vercel.js",
      };

      config = nodeExternals.apply(config, {
        additionalModuleDirs: ["../node_modules"],
      });

      if (dev) {
        expressDev.apply(config, { script: "./dist/express.js" });
      }
    }

    config.module.rules.push({
      include: /\.md$/,
      use: "frontmatter-markdown-loader",
    });

    config.module.rules.push({
      include: /\.mdx$/,
      use: [
        {
          loader: "esbuild-loader",
          options: {
            loader: "jsx",
            target: "es2015",
          },
        },
        "@mdx-js/loader",
      ],
    });

    return config;
  },
};
