import * as React from 'react'

function TextHero ({ title, details }) {
  return (
    <div className='py-0 md:py-2'>
      <div className='relative my-9'>
        <div className='absolute inset-0 -mr-3.5 bg-gradient-to-r from-red-100 to-purple-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:rotate-3 sm:rounded-3xl' />
        <div className='relative bg-white shadow-lg sm:rounded-3xl'>
          <div className='px-6 sm:px-12 lg:px-20 py-6'>
            <div className='lg:2/6 mt-20 lg:ml-16 text-left mb-20'>
              <div className='text-6xl font-semibold text-gray-900 leading-none'>
                {title}
              </div>
              {details
                ? (
                  <div className='mt-6 text-xl font-light text-true-gray-500 antialiased'>
                    {details}
                  </div>
                  )
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextHero
