import * as React from 'react'
import { withResources } from 'react-lazy-data'
import { Helmet } from 'react-helmet-async'

import BlogPostList from '../components/blog-post-list'
import TextHero from '../components/text-hero'

import BlogPostsResource from '../resources/blog-posts'

import global from '../../content/global'
import blogInfo from '../../content/blog/info'

const BlogPostsRenderer = withResources(BlogPostList)

function Blog () {
  const blogPostsResource = BlogPostsResource.use(20)

  return (
    <>
      <Helmet htmlAttributes={{ lang: 'en-us' }}>
        <title>{global.siteName} | Blog</title>
        <meta name='description' content={blogInfo.hero.details} />
      </Helmet>
      <div className='container px-6 w-full max-w-full lg:max-w-4xl xl:max-w-screen-1xl mx-auto'>
        <TextHero title={blogInfo.hero.title} details={blogInfo.hero.details} />

        <main className='my-36'>
          <BlogPostsRenderer blogPosts={blogPostsResource} />
        </main>
      </div>
    </>
  )
}

export default Blog
