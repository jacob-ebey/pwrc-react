const fs = require("fs");
const path = require("path");

const webpack = require("webpack");
const { merge } = require("webpack-merge");

const baseClientConfig = require("@pwrc/webpack/config/webpack.config.client");
const baseServerConfig = require("@pwrc/webpack/config/webpack.config.server");
const devConfig = require("@pwrc/webpack/config/webpack.config.development");

function watchCompiler(config, shouldResolveOnFirstSuccessfulBuild) {
  let resolve;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  const compiler = webpack(config);
  compiler.watch({}, (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }
    const info = stats.toJson();
    if (stats.hasErrors()) {
      console.log("Finished running webpack with errors.");
      info.errors.forEach((e) => console.error(e));
      reject(new Error());
    } else {
      if (resolve && shouldResolveOnFirstSuccessfulBuild) {
        resolve();
        resolve = false;
      }
    }
  });

  return promise;
}

async function dev(argv) {
  const configPath = path.resolve(process.cwd(), "pwrc.config.js");
  let config = {};
  if (fs.existsSync(configPath)) {
    config = require(configPath);
  }

  if (!config) {
    console.error("No config. Did you forget to export from pwrc.config.js?");
    process.exit(1);
  }

  let clientConfig = merge(baseClientConfig, devConfig);
  let serverConfig = merge(baseServerConfig, devConfig);

  if (config.webpack) {
    clientConfig = config.webpack(clientConfig, { server: false, dev: true });
    serverConfig = config.webpack(serverConfig, { server: true, dev: true });
  }

  if (!clientConfig) {
    console.error(
      "No client webpack config. Did you forget to return a valude from your 'webpack' function in pwrc.config.js?"
    );
    process.exit(1);
  }

  if (!serverConfig) {
    console.error(
      "No server webpack config. Did you forget to return a valude from your 'webpack' function in pwrc.config.js?"
    );
    process.exit(1);
  }

  try {
    await watchCompiler(clientConfig, true);
    await watchCompiler(serverConfig);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

module.exports = dev;
