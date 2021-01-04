const fs = require('fs')
const path = require('path')

const { flatten, mapValues } = require('lodash')

const PLUGIN_NAME = 'LazyStatsPlugin'

function getChunkFiles (c, map) {
  const files = c.files.map((f) => f)
  c.siblings.map((s) => map.get(s).files.forEach((f) => files.push(f)))
  return files
}

/**
 * @typedef {object} LazyStatsPluginOptions
 * @property {string} filename
 */

/** @type {LazyStatsPluginOptions} */
const defaultOptions = {
  filename: 'lazy-stats.json'
}

class LazyStatsPlugin {
  /**
   * @param {LazyStatsPluginOptions} options
   */
  constructor (options = defaultOptions) {
    this._filename = options.filename || defaultOptions.filename
  }

  /**
   * @param {import("webpack").Compiler} compiler
   */
  apply (compiler) {
    compiler.hooks.beforeCompile.tapPromise(
      PLUGIN_NAME,
      async (compilation) => {
        const toDelete = path.resolve(
          compiler.options.output.path,
          this._filename
        )
        await fs.promises.unlink(toDelete).catch(() => {})
      }
    )

    compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation) => {
      compilation.hooks.afterSeal.tapPromise(PLUGIN_NAME, async () => {
        const stats = compilation.getStats().toJson()
        const chunkMap = new Map(stats.chunks.map((c) => [c.id, c]))

        const dynamicModules = stats.modules.filter(
          (m) => m.reasons && m.reasons.some((r) => r.type === 'import()')
        )

        const dynamicModuleChunks = new Map(
          dynamicModules.map((mod) => [
            mod.id,
            flatten(mod.chunks.map((c) => chunkMap.get(c)))
          ])
        )

        const fileDynamicImports = {}
        for (const mod of dynamicModules) {
          for (const reason of mod.reasons) {
            if (
              !reason.moduleId ||
              !reason.resolvedModule ||
              !reason.userRequest
            ) {
              continue
            }

            if (!fileDynamicImports[reason.resolvedModule]) {
              fileDynamicImports[reason.resolvedModule] = {}
            }

            fileDynamicImports[reason.resolvedModule][reason.userRequest] =
              mod.id
          }
        }

        const statsShort = {
          publicPath: stats.publicPath,
          fileDynamicImports,
          dynamicModuleChunks: Object.fromEntries(
            Array.from(dynamicModuleChunks).map(([k, cs]) => [
              k,
              cs.map((c) => c.id)
            ])
          ),
          chunks: Object.assign(
            {},
            mapValues(stats.namedChunkGroups, (chunkStats) =>
              chunkStats.assets.map((a) => a.name)
            ),
            Object.fromEntries(
              Array.from(dynamicModuleChunks).map(([id, chunks]) => [
                id,
                flatten(chunks.map((c) => getChunkFiles(c, chunkMap)))
              ])
            )
          )
        }

        const result = JSON.stringify(statsShort, null, 2)

        compilation.assets[this._filename] = {
          source () {
            return result
          },
          size () {
            return result.length
          }
        }
      })
    })
  }
}

module.exports = LazyStatsPlugin
