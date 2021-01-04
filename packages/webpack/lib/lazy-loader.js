const { Parser } = require('acorn')
const walk = require('acorn-walk')
const { generate } = require('@jacob-ebey/astring')

const parser = Parser.extend()

function addChunksToLazy (node, moduleId, chunks) {
  const chunksProperty = {
    type: 'Property',
    key: {
      type: 'Identifier',
      name: 'chunks'
    },
    value: {
      type: 'ArrayExpression',
      elements: chunks.map((c) => ({
        type: 'Literal',
        value: c
      }))
    },
    kind: 'init'
  }

  const chunkNameProperty = {
    type: 'Property',
    key: {
      type: 'Identifier',
      name: 'chunkName'
    },
    value: {
      type: 'Literal',
      value: moduleId
    },
    kind: 'init'
  }

  if (node.arguments.length === 2) {
    if (node.arguments[1].type !== 'ObjectExpression') {
      throw new Error(
        'The second argument to lazy must be an object if provided'
      )
    }

    node.arguments[1].properties.push(chunksProperty)
    node.arguments[1].properties.push(chunkNameProperty)
  } else {
    node.arguments.push({
      type: 'ObjectExpression',
      properties: [chunksProperty, chunkNameProperty]
    })
  }
}

function addRequireResolveToLazy (node, imported) {
  const chunkNameProperty = {
    type: 'Property',
    key: {
      type: 'Identifier',
      name: 'chunkName'
    },
    value: {
      type: 'CallExpression',
      callee: {
        type: 'MemberExpression',
        object: {
          type: 'Identifier',
          name: 'require'
        },
        property: {
          type: 'Identifier',
          name: 'resolveWeak'
        }
      },
      arguments: [
        {
          type: 'Literal',
          value: imported
        }
      ]
    },
    kind: 'init'
  }

  if (node.arguments.length === 2) {
    if (node.arguments[1].type !== 'ObjectExpression') {
      throw new Error(
        'The second argument to lazy must be an object if provided'
      )
    }

    node.arguments[1].properties.push(chunkNameProperty)
  } else {
    node.arguments.push({
      type: 'ObjectExpression',
      properties: [chunkNameProperty]
    })
  }
}

async function executeClientLoader (source, sourceMap) {
  const ast = parser.parse(source, {
    sourceType: 'module',
    ecmaVersion: 'latest',
    locations: true
  })

  const lazyNames = new Set()
  walk.simple(ast, {
    ImportDeclaration (node) {
      if (node.source.value === 'react-lazy-ssr' && node.specifiers) {
        node.specifiers.forEach((specifier) => {
          if (specifier.type === 'ImportDefaultSpecifier') {
            lazyNames.add(specifier.local.name)
          }
        })
      }
    },
    CallExpression (node) {
      if (!node.callee || !lazyNames.has(node.callee.name)) {
        return
      }

      if (node.arguments.length > 2) {
        throw new Error('lazy only accepts two arguments')
      }

      const imported = new Set()
      walk.simple(node, {
        ImportExpression (node) {
          if (node.source && node.source.value) {
            imported.add(node.source.value)
          }
        }
      })

      if (imported.size > 1) {
        throw new Error('lazy must contain no more than one import expression')
      }

      if (imported.size === 0) {
        return
      }

      addRequireResolveToLazy(node, Array.from(imported)[0])
    }
  })

  if (lazyNames.size > 0) {
    const newCode = generate(ast)

    return [newCode]
  }

  return [source]
}

async function executeServerLoader (source, stats, fileDynamicImport) {
  const ast = parser.parse(source, {
    sourceType: 'module',
    ecmaVersion: 'latest',
    locations: true
  })

  const lazyNames = new Set()
  walk.simple(ast, {
    ImportDeclaration (node) {
      if (node.source.value === 'react-lazy-ssr' && node.specifiers) {
        node.specifiers.forEach((specifier) => {
          if (specifier.type === 'ImportDefaultSpecifier') {
            lazyNames.add(specifier.local.name)
          }
        })
      }
    },
    CallExpression (node) {
      if (!node.callee || !lazyNames.has(node.callee.name)) {
        return
      }

      if (node.arguments.length > 2) {
        throw new Error('lazy only accepts two arguments')
      }

      const imported = new Set()
      walk.simple(node, {
        ImportExpression (node) {
          if (node.source && node.source.value) {
            imported.add(node.source.value)
          }
        }
      })

      if (imported.size > 1) {
        throw new Error('lazy must contain no more than one import expression')
      }

      if (imported.size === 0) {
        return
      }

      const importedModule = Array.from(imported)[0]
      const dynamicModule = fileDynamicImport[importedModule]
      const chunks = stats.stats.dynamicModuleChunks[dynamicModule]

      addChunksToLazy(node, dynamicModule, chunks)
    }
  })

  if (lazyNames.size > 0) {
    const newCode = generate(ast)

    return [newCode]
  }

  return [source]
}

function loader (source, sourceMap) {
  const options = this.getOptions()
  const callback = this.async()

  if (options.ssr) {
    (async () => {
      const stats = await this._compiler.$pwrc.safeReadStats()

      if (!stats) {
        callback(new Error('Stats file not found'))
        return
      }

      if (!stats.files.has(this.resourcePath)) {
        callback(null, source, sourceMap)
        return
      }

      const fileDynamicImport = stats.files.get(this.resourcePath)

      const result = await executeServerLoader(
        source,
        stats,
        fileDynamicImport
      )
      callback(null, ...result)
    })().catch((err) => callback(err))
  } else {
    (async () => {
      const result = await executeClientLoader(source)
      callback(null, ...result)
    })().catch((err) => callback(err))
  }
}

module.exports = loader
