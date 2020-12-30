const fs = require("fs");
const path = require("path");

const PLUGIN_NAME = "LazyPlugin";

function checkExistsWithTimeout(filePath, timeout) {
  return new Promise(async function (resolve, reject) {
    var timer = setTimeout(function () {
      watcher.close();
      reject(
        new Error("File did not exists and was not created during the timeout.")
      );
    }, timeout);

    await fs.promises
      .mkdir(path.dirname(filePath), { recursive: true })
      .catch(() => {});

    fs.access(filePath, fs.constants.R_OK, function (err) {
      if (!err) {
        clearTimeout(timer);
        watcher.close();
        resolve();
      }
    });

    var dir = path.dirname(filePath);
    var basename = path.basename(filePath);
    var watcher = fs.watch(dir, function (eventType, filename) {
      if (eventType === "rename" && filename === basename) {
        clearTimeout(timer);
        watcher.close();
        resolve();
      }
    });
  });
}

/**
 * @typedef {object} LazyPluginOptions
 * @property {string} filename
 */

/** @type {LazyPluginOptions} */
const defaultOptions = {
  filename: path.resolve(process.cwd(), "public/static/lazy-stats.json"),
};

class LazyPlugin {
  constructor(options = defaultOptions) {
    this._filename = options.filename || defaultOptions.filename;
  }

  /**
   * @param {import("webpack").Compiler} compiler
   */
  apply(compiler) {
    const pwrc = (compiler.$pwrc = compiler.$pwrc || {});
    let statsPromise = null;

    const { DefinePlugin } = compiler.webpack;

    pwrc.safeReadStats = () => {
      if (!statsPromise) {
        statsPromise = (async () => {
          await checkExistsWithTimeout(this._filename, 30000);
          const json = await fs.promises.readFile(this._filename, "utf-8");
          const stats = JSON.parse(json);
          const files = new Map(
            Object.entries(stats.fileDynamicImports).map(([p, v]) => [
              path.resolve(process.cwd(), p),
              v,
            ])
          );
          return { stats, files };
        })();
      }

      return statsPromise;
    };

    let providedStatsRef = {};
    new DefinePlugin({
      COMPILER_PROVIDED_STATS: DefinePlugin.runtimeValue(
        () => JSON.stringify(providedStatsRef.value),
        [this._filename]
      ),
    }).apply(compiler);

    compiler.hooks.beforeCompile.tapPromise(PLUGIN_NAME, async () => {
      providedStatsRef.value = (await pwrc.safeReadStats()).stats;
    });

    compiler.hooks.afterCompile.tap(PLUGIN_NAME, (compilation) => {
      statsPromise = null;
    });
  }
}

module.exports = LazyPlugin;
