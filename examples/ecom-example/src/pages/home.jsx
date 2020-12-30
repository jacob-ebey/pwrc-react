import * as React from "react";
import lazy from "react-lazy-ssr";
import { Helmet } from "react-helmet-async";

import useCacheControl from "@pwrc/cache-control";

import CategoryGrid, {
  CategoryGridPlaceholder,
} from "../components/category-grid";
import ProductHero from "../components/product-hero";

import CategoryResource from "../resources/category";
import ProductResource from "../resources/product";
import ErrorBoundary from "../components/error-boundary";

const ClientCategoryGrid = lazy(() => CategoryGrid, { ssr: false });

function Home() {
  const featuredProductResource = ProductResource.use(1);
  const womensCategoryResource = CategoryResource.use("women clothing?limit=4");
  const mensCategoryResource = CategoryResource.use("men clothing?limit=4");

  useCacheControl(300);

  return (
    <>
      <Helmet htmlAttributes={{ lang: "en-us" }}>
        <title>Brand | Home</title>
        <meta name="description" content="Example store built with @PWRC" />
      </Helmet>

      <React.Suspense fallback="">
        <div className="container px-6 w-full max-w-full xl:max-w-screen-2xl mx-auto">
          <ProductHero productResource={featuredProductResource} />

          <main className="my-8">
            <CategoryGrid
              label="Womens"
              caption="200+ Products"
              categoryResource={womensCategoryResource}
            />
            <ErrorBoundary
              fallback={
                <CategoryGridPlaceholder label="Mens" caption="Error loading" />
              }
            >
              <React.Suspense
                fallback={
                  <CategoryGridPlaceholder
                    label="Mens"
                    caption="200+ Products"
                  />
                }
              >
                <ClientCategoryGrid
                  label="Mens"
                  caption="200+ Products"
                  categoryResource={mensCategoryResource}
                />
              </React.Suspense>
            </ErrorBoundary>
          </main>
        </div>
      </React.Suspense>
    </>
  );
}

export default Home;
