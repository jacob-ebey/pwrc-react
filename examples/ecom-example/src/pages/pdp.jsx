import * as React from 'react'
import lazy from 'react-lazy-ssr'
import { useParams } from 'react-router-dom'

import useCacheControl from '@pwrc/cache-control'

import PDPHeader from '../components/pdp-header'

import { CategoryGridPlaceholder } from '../components/category-grid'
import ErrorBoundary from '../components/error-boundary'

import CategoryResource from '../resources/category'
import ProductResource from '../resources/product'

const ClientCategoryGrid = lazy(() => import('../components/category-grid'), {
  ssr: false
})

function LazyCategoryGrid ({ productResource }) {
  const product = productResource.read()
  const categoryResource = CategoryResource.use(product.category)

  useCacheControl(300)

  return (
    <ErrorBoundary>
      <React.Suspense
        fallback={<CategoryGridPlaceholder label='More Products' />}
      >
        <ClientCategoryGrid
          label='More Products'
          categoryResource={categoryResource}
        />
      </React.Suspense>
    </ErrorBoundary>
  )
}

function PDP () {
  const { productId } = useParams()
  const productResource = ProductResource.use(productId)

  return (
    <main className='my-8'>
      <div className='container mx-auto px-6'>
        <PDPHeader productResource={productResource} />
        <div className='mt-16'>
          <LazyCategoryGrid productResource={productResource} />
        </div>
      </div>
    </main>
  )
}

export default PDP
