import * as React from "react";

import ProductCard, { ProductCardPlaceholder } from "./product-card";

function CategoryGridContainer({ label, caption, children }) {
  return (
    <>
      <h2 className="text-gray-600 text-2xl font-medium">{label}</h2>

      {caption ? (
        <span className="mt-3 text-sm text-gray-500">{caption}</span>
      ) : null}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-6">
        {children}
      </div>
    </>
  );
}

function CategoryGrid({ label, caption, categoryResource }) {
  const category = categoryResource.read();

  return (
    <CategoryGridContainer label={label} caption={caption}>
      {category.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          image={product.image}
        />
      ))}
    </CategoryGridContainer>
  );
}

export function CategoryGridPlaceholder({ label, caption }) {
  return (
    <CategoryGridContainer label={label} caption={caption}>
      {[1, 2, 3].map((key) => (
        <ProductCardPlaceholder key={key} />
      ))}
    </CategoryGridContainer>
  );
}

export default CategoryGrid;
