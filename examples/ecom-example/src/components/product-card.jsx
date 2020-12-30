import * as React from "react";
import { Link } from "react-router-dom";
import CartIcon from "./icons/cart-icon";

function ProductCard({ id, image, price, title, onCartClicked }) {
  return (
    <div className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
      <div
        className="flex items-end justify-end h-56 w-full bg-cover"
        style={{ backgroundImage: `url('${image}')` }}
      >
        <button
          className="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
          aria-label="add to cart"
        >
          <CartIcon className="h-6 w-6" />
        </button>
      </div>
      <Link to={`/pdp/${id}`} className="block px-5 py-3">
        <p className="text-gray-700 uppercase">{title}</p>
        <span className="text-gray-500 inline-block mt-2">${price}</span>
      </Link>
    </div>
  );
}

export function ProductCardPlaceholder() {
  return (
    <div className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
      <div
        className="flex items-end justify-end h-56 w-full bg-cover"
        style={{
          backgroundImage: `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=)`,
        }}
      >
        <button
          className="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
          aria-label="add to cart"
          disabled
        >
          <CartIcon className="h-6 w-6" />
        </button>
      </div>
      <div className="px-5 py-3">
        <p className="text-gray-700 uppercase bg-gray-200">&nbsp;</p>
        <span className="text-gray-500 mt-2 w-12 inline-block bg-gray-200">
          &nbsp;
        </span>
      </div>
    </div>
  );
}

export default ProductCard;
