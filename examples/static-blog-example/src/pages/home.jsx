import * as React from 'react'
import { withResources } from 'react-lazy-data'
import { Helmet } from 'react-helmet-async'

import BlogPostList from '../components/blog-post-list'
import TextHero from '../components/text-hero'

import BlogPostsResource from '../resources/blog-posts'

import global from '../../blog/global'
import home from '../../blog/home'

const BlogPostsRenderer = withResources(BlogPostList)

function Home () {
  const blogPostsResource = BlogPostsResource.use(20)

  return (
    <>
      <Helmet htmlAttributes={{ lang: 'en-us' }}>
        <title>{global.siteName} | Home</title>
        <meta name='description' content={home.hero.details} />
      </Helmet>
      <div className='container px-6 w-full max-w-full lg:max-w-4xl xl:max-w-screen-1xl mx-auto'>
        <main className='my-8'>
          <TextHero title={home.hero.title} details={home.hero.details} />

          <div className='my-8'>
            <BlogPostsRenderer blogPosts={blogPostsResource} />
          </div>
        </main>
      </div>
    </>
  )
}

export default Home
