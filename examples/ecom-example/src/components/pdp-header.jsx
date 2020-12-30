import * as React from "react";
import { Helmet } from "react-helmet-async";

import CartIcon from "./icons/cart-icon";
import MinusIcon from "./icons/minus-icon";
import PlusIcon from "./icons/plus-icon";

function PDPHeader({ productResource }) {
  const product = productResource.read();

  return (
    <>
      <Helmet htmlAttributes={{ lang: "en-us" }}>
        <title>Brand | {product.title}</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="md:flex md:items-center">
        <div className="w-full h-64 md:w-1/2 lg:h-96">
          <img
            className="h-full w-full rounded-md object-cover max-w-lg mx-auto"
            src={product.image}
            alt="Nike Air"
          />
        </div>
        <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
          <h1 className="text-gray-700 uppercase text-lg">{product.title}</h1>
          <span className="text-gray-500 mt-3">${product.price}</span>
          <hr className="my-3" />
          <div className="mt-2">
            <label className="text-gray-700 text-sm">Count 2:</label>
            <div className="flex items-center mt-1">
              <button
                className="text-gray-500 focus:outline-none focus:text-gray-600"
                title="increment count"
              >
                <PlusIcon className="h-5 w-5" />
              </button>
              <span className="text-gray-700 text-lg mx-2">1</span>
              <button
                className="text-gray-500 focus:outline-none focus:text-gray-600"
                title="decrement count"
              >
                <MinusIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="flex items-center mt-6">
            <button className="px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
              Order Now
            </button>
            <button
              className="mx-2 text-gray-600 border rounded-md p-2 hover:bg-gray-200 focus:outline-none"
              title="add to cart"
            >
              <CartIcon className="h-5 w-5" />
            </button>
          </div>
          <hr className="my-3" />
          <p>{product.description}</p>
        </div>
      </div>
    </>
  );
}

export default PDPHeader;
