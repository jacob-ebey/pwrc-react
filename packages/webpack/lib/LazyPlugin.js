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

    compiler.hooks.beforeRun.tapPromise(PLUGIN_NAME, async (comp) => {
      const providedStats = (await pwrc.safeReadStats()).stats;

      new DefinePlugin({
        COMPILER_PROVIDED_STATS: JSON.stringify(providedStats),
      }).apply(comp);
    });

    compiler.hooks.afterCompile.tap(PLUGIN_NAME, (compilation) => {
      statsPromise = null;
    });

    compiler.hooks.thisCompilation.tap(PLUGIN_NAME, (compilation) => {
      compilation.fileDependencies.add(path.resolve(this._filename));

      compilation.hooks.childCompiler.tap(PLUGIN_NAME, (childCompiler) => {
        childCompiler.$pwrc = pwrc;
      });
    });

    compiler.hooks.run.tap(PLUGIN_NAME, () => {
      statsPromise = null;
    });

    compiler.hooks.watchRun.tap(PLUGIN_NAME, () => {
      statsPromise = null;
    });
  }
}

module.exports = LazyPlugin;
