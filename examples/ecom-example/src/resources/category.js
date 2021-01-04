import { createResourceFactory } from 'react-lazy-data'
import fetch from 'cross-fetch'

const CategoryResource = createResourceFactory(
  (id) =>
    fetch(`https://pwrc-react.vercel.app/api/fakestoreapi/products/category/${id}`).then((res) =>
      res.json()
    ),
  { id: 'category' }
)

export default CategoryResource
