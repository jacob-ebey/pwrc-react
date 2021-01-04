const AppShellPlugin = require('./lib/AppShellPlugin')
const LazyPlugin = require('./lib/LazyPlugin')
const LazyStatsPlugin = require('./lib/LazyStatsPlugin')

const PLUGIN_NAME = 'PWRCPlugin'

/**
 * @typedef {object} PWRCPluginOptions
 * @property {import("./lib/AppShellPlugin").AppShellPluginOptions} shell
 */

class PWRCPlugin {
  /**
   * @param {PWRCPluginOptions} options
   */
  constructor (options) {
    this._options = options
  }

  /**
   * @param {import("webpack").Compiler} compiler
   */
  apply (compiler) {
    const { NormalModule } = compiler.webpack

    new AppShellPlugin(this._options.shell).apply(compiler)

    if (!this._options.ssr) {
      new LazyStatsPlugin().apply(compiler)
    }

    if (this._options.ssr) {
      new LazyPlugin().apply(compiler)
    }

    compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation) => {
      const normalModuleHooks = NormalModule.getCompilationHooks(compilation)

      normalModuleHooks.loader.tap(PLUGIN_NAME, (_, normalModule) => {
        if (normalModule.type && normalModule.type.startsWith('javascript/')) {
          normalModule.loaders.unshift({
            loader: require.resolve('@pwrc/webpack/lib/lazy-loader'),
            options: {
              ssr: this._options.ssr
            }
          })
        }
      })
    })
  }
}

module.exports = PWRCPlugin
