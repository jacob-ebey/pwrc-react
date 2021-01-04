import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { withResources } from 'react-lazy-data'

import BlogPost from '../components/blog-post'

import BlogPostResource from '../resources/blog-post'

import global from '../../content/global'
import blogInfo from '../../content/blog/info'

const BlogPostRenderer = withResources(BlogPost)

function Post () {
  const { slug } = useParams()
  const blogPostResource = BlogPostResource.use(slug)

  return (
    <>
      <Helmet htmlAttributes={{ lang: 'en-us' }}>
        <title>{global.siteName} | Blog Post</title>
        <meta name='description' content={blogInfo.hero.details} />
      </Helmet>
      <div className='container px-6 w-full max-w-full lg:max-w-4xl xl:max-w-screen-1xl mx-auto'>
        <BlogPostRenderer post={blogPostResource} />
      </div>
    </>
  )
}

export default Post
