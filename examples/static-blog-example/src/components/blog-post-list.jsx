import * as React from 'react'
import BlogPostCard from './blog-post-card'

function BlogPostList ({ blogPosts }) {
  return (
    <>
      {blogPosts.map((blogPost) => (
        <BlogPostCard
          key={blogPost.slug}
          className='mb-8'
          categories={blogPost.categories}
          date={blogPost.date}
          description={blogPost.description}
          title={blogPost.title}
          slug={blogPost.slug}
        />
      ))}
    </>
  )
}

export default BlogPostList
