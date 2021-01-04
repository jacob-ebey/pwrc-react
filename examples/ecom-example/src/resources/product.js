import { createResourceFactory } from 'react-lazy-data'
import fetch from 'cross-fetch'

const ProductResource = createResourceFactory(
  (id) =>
    fetch(`https://pwrc-react.vercel.app/api/fakestoreapi/products/${id}`).then((res) => res.json()),
  { id: 'product' }
)

export default ProductResource
