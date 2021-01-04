const expressDev = require('@pwrc/express/dev')
const nodeExternals = require('@pwrc/webpack/node-externals')

module.exports = {
  /**
   *
   * @param {import("webpack").Configuration} config
   * @param {*} param1
   */
  webpack (config, { server, dev }) {
    if (server) {
      config.entry = {
        express: './src/express.js',
        static: './src/static.js',
        vercel: './src/vercel.js'
      }

      config = nodeExternals.apply(config, {
        additionalModuleDirs: ['../node_modules']
      })

      if (dev) {
        expressDev.apply(config, { script: './dist/express.js' })
      }
    }

    config.module.rules.push({
      include: /\.md$/,
      use: 'frontmatter-markdown-loader'
    })

    return config
  }
}
