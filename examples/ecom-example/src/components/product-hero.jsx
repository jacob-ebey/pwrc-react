import * as React from 'react'

function ProductHero ({ productResource }) {
  const product = productResource.read()

  return (
    <div className='hero py-16'>
      <div className='px-4 sm:px-8 lg:px-16 xl:px-20'>
        <div className='hero-wrapper grid grid-cols-1 md:grid-cols-12 gap-8 items-center'>
          <div className='hero-text col-span-6'>
            <h1 className='font-bold text-4xl md:text-5xl max-w-xl text-gray-900 leading-tight'>
              {product.title}
            </h1>
            <hr className='w-12 h-1 rounded-full mt-8' />
            <p className='text-gray-800 text-base leading-relaxed mt-8 font-semibold'>
              {product.description}
            </p>
          </div>

          <div className='hero-image col-span-6 flex justify-center'>
            <img className='block md:h-80 xl:h-96' src={product.image} alt='' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductHero
