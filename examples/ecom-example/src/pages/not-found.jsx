import * as React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import NotFoundIcon from '../components/icons/not-found'

function NotFound () {
  return (
    <>
      <Helmet htmlAttributes={{ lang: 'en-us' }}>
        <title>Brand | About</title>
        <meta name='description' content='Learn more about @PWRC' />
      </Helmet>
      <div className='container mx-auto px-6'>
        <main className='my-8 flex flex-col md:flex-row items-center justify-center px-5'>
          <div className='max-w-md'>
            <div className='text-5xl font-dark font-bold'>404</div>
            <p className='text-2xl md:text-3xl font-light leading-normal'>
              Sorry we couldn't find this page.
            </p>
            <p className='mb-8'>
              But dont worry, you can find plenty of other things on our
              homepage.
            </p>

            <Link
              className='px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700'
              to='/'
            >
              back to homepage
            </Link>
          </div>
          <div className='max-w-lg'>
            <NotFoundIcon />
          </div>
        </main>
      </div>
    </>
  )
}

export default NotFound
