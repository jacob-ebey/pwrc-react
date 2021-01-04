import { createResourceFactory } from 'react-lazy-data'

const context = require.context('../../content/blog', false, /\.md$/)

const BlogPostResource = createResourceFactory(
  async (id) => {
    const trimmedId = id.replace(/^\.\//, '')
    const request = trimmedId.endsWith('.md') ? trimmedId : `${trimmedId}.md`
    const blogPost = await context(`./${request}`)

    return blogPost
  },
  { id: 'blog-post' }
)

export default BlogPostResource
