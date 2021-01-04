const webpackNodeExternals = require('webpack-node-externals')

function nodeExternals (opts) {
  const options = opts || {}
  return webpackNodeExternals({
    ...options,
    allowlist: Array.from(
      new Set([
        ...(options.allowlist || []),
        '@pwrc/app',
        '@pwrc/document',
        '@pwrc/express',
        '@pwrc/prerender',
        '@pwrc/static',
        '@pwrc/vercel'
      ])
    )
  })
}

nodeExternals.apply = (config, opts) => {
  config.externals = config.externals || []
  config.externals.push(nodeExternals(opts))
  config.externals.push({
    react: 'commonjs react',
    'react-dom': 'commonjs react-dom',
    'react-dom/server': 'commonjs react-dom/server',
    'react-lazy-data': 'commonjs react-lazy-data',
    'react-lazy-data/server': 'commonjs react-lazy-data/server',
    'react-lazy-ssr': 'commonjs react-lazy-ssr',
    'react-lazy-ssr/server': 'commonjs react-lazy-ssr/server',
    'react-helmet-async': 'commonjs react-helmet-async'
  })

  return config
}

module.exports = nodeExternals
