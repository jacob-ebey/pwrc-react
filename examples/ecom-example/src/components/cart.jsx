import * as React from 'react'
import cn from 'classnames'

import CartProduct from './cart-product'
import Spinner from './spinner'
import CloseIcon from './icons/close-icon'

function Cart ({ open, onClose, cartResource }) {
  return (
    <div
      className={cn(
        open ? 'translate-x-0 ease-out' : 'translate-x-full ease-in',
        'fixed right-0 top-0 max-w-xs w-full h-full px-6 py-4 transition duration-300 transform overflow-y-auto bg-white border-l-2 border-gray-300'
      )}
    >
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-medium text-gray-700'>Your cart</h1>
        <button
          onClick={onClose}
          className='text-gray-600 focus:outline-none'
          aria-label='close cart'
        >
          <CloseIcon className='h-5 w-5' />
        </button>
      </div>
      <hr className='my-3' />
      <React.Suspense fallback={<Spinner />}>
        <CartRenderer cartResource={cartResource} />
      </React.Suspense>
    </div>
  )
}

function CartRenderer ({ cartResource }) {
  const { products } = cartResource.read()

  return (
    <>
      {products.map(({ productId, quantity }) => (
        <CartProduct
          key={productId}
          productId={productId}
          quantity={quantity}
        />
      ))}
    </>
  )
}

export default Cart
