import { createResourceFactory } from 'react-lazy-data'
import fetch from 'cross-fetch'

const CartResource = createResourceFactory(
  (id) =>
    fetch(`https://pwrc-react.vercel.app/api/fakestoreapi/carts/${id}`).then((res) => res.json()),
  { id: 'cart' }
)

export default CartResource
