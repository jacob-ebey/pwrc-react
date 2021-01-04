import * as React from 'react'
import { Helmet } from 'react-helmet-async'

import global from '../../content/global'

import TextHero from './text-hero'

import '../styles/markdown.css'

function BlogPost ({ post }) {
  return (
    <>
      <Helmet htmlAttributes={{ lang: 'en-us' }}>
        <title>
          {global.siteName} | {post.attributes.title}
        </title>
        <meta name='description' content={post.attributes.description} />
      </Helmet>

      <TextHero
        title={post.attributes.title}
        details={post.attributes.description}
      />

      <article
        className='markdown my-36'
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </>
  )
}

export default BlogPost
