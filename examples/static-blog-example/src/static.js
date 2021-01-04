import path from 'path'
import { promisify } from 'util'

import globCB from 'glob'

import pwrcStatic from '@pwrc/static'

/* eslint-disable no-undef */
const basePath = BASE_PATH
/* eslint-enable no-undef */

const glob = promisify(globCB)

const providedPaths = process.argv.slice(2);

(async () => {
  let paths = providedPaths.length > 0 ? providedPaths : false

  if (!paths) {
    paths = ['/', '/about', '/404.html']

    const posts = await glob('*.md', {
      cwd: path.resolve(process.cwd(), 'blog')
    })

    posts.forEach((post) => paths.push(`/post/${post.replace(/\.md/, '')}`))
  }

  pwrcStatic({
    paths,
    outdir: path.resolve(process.cwd(), 'public'),
    basename: basePath,
    followLinks: true
  })
})().catch((error) => {
  console.error(error)
  process.exit(1)
})
