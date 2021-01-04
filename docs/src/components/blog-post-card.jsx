import * as React from 'react'
import { Link } from 'react-router-dom'

function BlogPostCard ({
  className,
  categories,
  date,
  description,
  title,
  slug
}) {
  return (
    <div className={className}>
      <div className='px-10 py-6 bg-white rounded-lg shadow-md'>
        <div className='flex justify-between items-center'>
          <span className='font-light text-gray-600'>{date}</span>

          {categories
            ? (
              <span>
                {categories.map((category) => (
                  <a
                    key={category}
                    href='#'
                    className='px-2 py-1 ml-2 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500'
                  >
                    {category}
                  </a>
                ))}
              </span>
              )
            : null}
        </div>
        <div className='mt-2'>
          <Link
            to={`/blog/${slug}`}
            className='text-2xl text-gray-700 font-bold hover:underline'
          >
            {title}
          </Link>
          <p className='mt-2 text-gray-600'>{description}</p>
        </div>
        <div className='flex justify-between items-center mt-4'>
          <Link to={`/blog/${slug}`} className='text-blue-500 hover:underline'>
            Read more
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BlogPostCard
