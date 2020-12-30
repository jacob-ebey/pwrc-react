const path = require("path");

/**
 * @typedef {object} AppShellPluginOptions
 * @property {string} app
 * @property {string} document
 */

class AppShellPlugin {
  /**
   * @param {AppShellPluginOptions} options
   */
  constructor(options) {
    this._options = options;
  }

  /**
   *
   * @param {import("webpack").Compiler} compiler
   */
  apply(compiler) {
    const document = this._options.document;

    compiler.options.resolve.alias = Object.assign(
      compiler.options.resolve.alias || {},
      {
        "@pwrc/app": this._options.app,
        "@pwrc/document": document || false,
      }
    );
  }
}

module.exports = AppShellPlugin;
