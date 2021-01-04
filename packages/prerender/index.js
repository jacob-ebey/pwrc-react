const { createElement } = require('react')
const {
  renderToStringAsync
} = require('react-async-ssr')
const {
  DataExtractor
} = require('react-lazy-data/server')
const { StaticRouter } = require('react-router-dom')
const { ChunkExtractor } = require('react-lazy-ssr/server')
const { HelmetProvider } = require('react-helmet-async')

const App = require('@pwrc/app').default
const Document = require('@pwrc/document').default
const useCacheControl = require('@pwrc/cache-control')

/* eslint-disable no-undef */
const stats = COMPILER_PROVIDED_STATS
/* eslint-enable no-undef */

/**
 * @param {string} location
 */
async function prerender (location, options) {
  const basename = (options && options.basename) || ''
  const chunkExtractor = new ChunkExtractor({ stats })
  const dataExtractor = new DataExtractor()
  const cacheControlContext = {}
  const helmetContext = {}

  const appHtml = await renderToStringAsync(
    chunkExtractor.collectChunks(
      dataExtractor.collectData(
        createElement(
          useCacheControl.Context.Provider,
          { value: cacheControlContext },
          createElement(
            HelmetProvider,
            { context: helmetContext },
            createElement(
              StaticRouter,
              { location, basename },
              createElement(App)
            )
          )
        )
      )
    )
  )

  const dataTag = dataExtractor.getScript()
  const publicPath =
    stats.publicPath !== 'auto' ? stats.publicPath || '/' : '/'

  const paths = chunkExtractor.getScriptFiles()
  const modifiers = ''
  const scripts = paths
    .filter((p) => p.endsWith('.js'))
    .map((path) => {
      const scriptModifiers =
        modifiers === ''
          ? ''
          : `${modifiers} onload="(window.__REACT_LAZY_SSR_FILES_READY__ = window.__REACT_LAZY_SSR_FILES_READY__ || []).push(${JSON.stringify(
              path
            )})"`
      return `<script src="${publicPath}${path}"${scriptModifiers}></script>`
    })
  const chunkNames = chunkExtractor._chunkNames
  if (chunkNames.size > 0) {
    let varsJs = `window.__REACT_LAZY_SSR_CHUNKS_REQUIRED__ = ${JSON.stringify(
      Array.from(chunkNames)
    )};`
    if (modifiers !== '') {
      varsJs += `\nwindow.__REACT_LAZY_SSR_FILES_REQUIRED__ = ${JSON.stringify(
        Array.from(paths)
      )};`
    }
    scripts.unshift(`<script>${varsJs}</script>`)
  }
  const chunkTags = scripts.join('\n')

  const preloadTags = paths
    .map((chunk) => {
      if (chunk.endsWith('.css')) {
        return `<link rel="stylesheet" href="${publicPath}${chunk}" />`
      }

      return `<link rel="preload" as="script" href="${publicPath}${chunk}" />`
    })
    .join('\n')

  const { helmet } = helmetContext

  const documentHtml = Document({
    html: appHtml,
    htmlAttributes:
      helmet && helmet.htmlAttributes ? helmet.htmlAttributes.toString() : '',
    head: [
      '<meta charset="UTF-8">',
      preloadTags,
      helmet && helmet.title ? helmet.title.toString() : '',
      helmet && helmet.meta ? helmet.meta.toString() : '',
      helmet && helmet.link ? helmet.link.toString() : ''
    ].join('\n'),
    scripts: [chunkTags, dataTag].join('\n')
  })

  return {
    html: documentHtml,
    maxAge: cacheControlContext.maxAge || 0
  }
}

module.exports = prerender
