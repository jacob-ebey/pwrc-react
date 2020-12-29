const path = require("path");

const schema = require("./AppShellPluginSchema.json");

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
    const { validateSchema } = compiler.webpack;

    validateSchema(schema, this._options);

    const document =
      this._options.document || path.resolve(__dirname, "runtime/Document.jsx");

    compiler.options.resolve.alias = Object.assign(
      compiler.options.resolve.alias || {},
      {
        "@pwrc/app": this._options.app,
        "@pwrc/document": document,
      }
    );
  }
}

module.exports = AppShellPlugin;
