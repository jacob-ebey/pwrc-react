import * as React from 'react'

function TextHero ({ title, details, ctaText }) {
  return (
    <div className='relative w-full max-w-full lg:max-w-6xl xl:max-w-screen-2xl mx-auto'>
      <div className='absolute inset-0 -mr-3.5 bg-gradient-to-r from-red-100 to-purple-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:rotate-3 sm:rounded-3xl' />
      <div className='relative bg-white shadow-lg sm:rounded-3xl'>
        <div className='px-12 lg:px-20 py-6'>
          <div className='lg:2/6 xl:w-2/4 mt-20 lg:mt-40 lg:ml-16 text-left mb-20'>
            <div className='text-6xl font-semibold text-gray-900 leading-none'>
              {title}
            </div>
            <div className='mt-6 text-xl font-light text-true-gray-500 antialiased'>
              {details}
            </div>
            <button className='mt-6 px-8 py-4 rounded-full font-normal tracking-wide bg-gradient-to-b from-blue-600 to-blue-700 text-white outline-none focus:outline-none hover:shadow-lg hover:from-blue-700 transition duration-200 ease-in-out'>
              {ctaText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextHero
