const path = require("path");

const NodemonPlugin = require("nodemon-webpack-plugin");

function dev({ script }) {
  return new NodemonPlugin({
    script,
    watch: path.resolve(process.cwd(), "dist"),
  });
}

dev.apply = (config, opts) => {
  config.plugins = config.plugins || [];
  config.plugins.push(dev(opts));

  return config;
};

module.exports = dev;
