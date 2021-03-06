import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { withResources } from 'react-lazy-data'

import BlogPost from '../components/blog-post'

import BlogPostResource from '../resources/blog-post'

import global from '../../blog/global'
import home from '../../blog/home'

const BlogPostRenderer = withResources(BlogPost)

function Post () {
  const { slug } = useParams()
  const blogPostResource = BlogPostResource.use(slug)

  return (
    <>
      <Helmet htmlAttributes={{ lang: 'en-us' }}>
        <title>{global.siteName} | Blog Post</title>
        <meta name='description' content={home.hero.details} />
      </Helmet>
      <div className='container px-6 w-full max-w-full lg:max-w-4xl xl:max-w-screen-1xl mx-auto'>
        <main className='my-8'>
          <div className='my-8'>
            <BlogPostRenderer post={blogPostResource} />
          </div>
        </main>
      </div>
    </>
  )
}

export default Post
