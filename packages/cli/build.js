const fs = require("fs");
const path = require("path");

const webpack = require("webpack");

const baseClientConfig = require("@pwrc/webpack/config/webpack.config.client");
const baseServerConfig = require("@pwrc/webpack/config/webpack.config.server");

function runCompiler(config) {
  return new Promise((resolve, reject) => {
    const compiler = webpack(config);
    compiler.run((err, stats) => {
      if (err) {
        console.error(err.stack || err);
        if (err.details) {
          console.error(err.details);
        }
        reject(err);
        return;
      }
      const info = stats.toJson();
      if (stats.hasErrors()) {
        console.log("Finished running webpack with errors.");
        info.errors.forEach((e) => console.error(e));
        reject(new Error());
      } else {
        resolve();
      }
    });
  });
}

async function build(argv) {
  const configPath = path.resolve(process.cwd(), "pwrc.config.js");
  let config = {};
  if (fs.existsSync(configPath)) {
    config = require(configPath);
  }

  if (!config) {
    console.error("No config. Did you forget to export from pwrc.config.js?");
    process.exit(1);
  }

  let clientConfig = baseClientConfig;
  let serverConfig = baseServerConfig;

  if (config.webpack) {
    clientConfig = config.webpack(clientConfig, { server: false });
    serverConfig = config.webpack(serverConfig, { server: true });
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
    await runCompiler(clientConfig);
    await runCompiler(serverConfig);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

module.exports = build;
