import * as React from 'react'

import MinusIcon from './icons/minus-icon'
import PlusIcon from './icons/plus-icon'

import ProductResource from '../resources/product'

function CartProduct ({ productId, quantity }) {
  const productResource = ProductResource.use(productId)

  return (
    <CartProductRenderer
      productResource={productResource}
      quantity={quantity}
    />
  )
}

function CartProductRenderer ({ productResource, quantity }) {
  const product = productResource.read()

  return (
    <div className='flex justify-between mt-6'>
      <div className='flex'>
        <img
          className='h-20 w-20 object-cover rounded'
          src={product.image}
          alt=''
        />
        <div className='mx-3'>
          <h2 className='text-sm text-gray-600'>{product.title}</h2>
          <div className='flex items-center mt-2'>
            <button
              className='text-gray-500 focus:outline-none focus:text-gray-600'
              aria-label='increment quantity'
            >
              <PlusIcon className='h-5 w-5' />
            </button>
            <span className='text-gray-700 mx-2'>{quantity}</span>
            <button
              className='text-gray-500 focus:outline-none focus:text-gray-600'
              aria-label='decrement quantity'
            >
              <MinusIcon className='h-5 w-5' />
            </button>
          </div>
        </div>
      </div>
      <span className='text-gray-600'>{product.price}</span>
    </div>
  )
}

export default CartProduct
