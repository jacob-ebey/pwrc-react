const expressDev = require('@pwrc/express/dev')
const nodeExternals = require('@pwrc/webpack/node-externals')

module.exports = {
  /**
   *
   * @param {import("webpack").Configuration} config
   * @param {{ server: boolean; dev: boolean }} param1
   */
  webpack (config, { server, dev }) {
    if (server) {
      config.entry = {
        express: './src/express.js',
        vercel: './src/vercel.js'
      }

      nodeExternals.apply(config, {
        additionalModuleDirs: ['../node_modules']
      })

      if (dev) {
        expressDev.apply(config, { script: './dist/express.js' })
      }
    }

    return config
  }
}
