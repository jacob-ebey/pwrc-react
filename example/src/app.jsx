import * as React from "react";
import { useCallback, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import lazy from "react-lazy-ssr";

import ErrorBoundary from "./components/error-boundary";
import Shell from "./components/shell";

import CartResource from "./resources/cart";

import "./app.css";

const Cart = lazy(() => import("./components/cart"), { ssr: false });

// Routes
const About = lazy(() => import("./pages/about"));
const Home = lazy(() => import("./pages/home"));
const NotFound = lazy(() => import("./pages/not-found"));
const PDP = lazy(() => import("./pages/pdp"));

function App() {
  const cartResource = CartResource.use(1);

  const [cartOpen, setCartOpen] = useState(false);
  const toggleCart = useCallback(() => setCartOpen(!cartOpen), [
    cartOpen,
    setCartOpen,
  ]);
  const closeCart = useCallback(() => setCartOpen(false), [setCartOpen]);

  return (
    <>
      <Helmet htmlAttributes={{ lang: "en-us" }}>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="manifest" content="/manifest.json" />
      </Helmet>

      <ErrorBoundary>
        <Shell toggleCart={toggleCart}>
          <React.Suspense fallback="">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/pdp/:productId">
                <PDP />
              </Route>

              <Route>
                <NotFound />
              </Route>
            </Switch>
            <ErrorBoundary>
              <React.Suspense fallback="">
                <Cart
                  cartResource={cartResource}
                  open={cartOpen}
                  onClose={closeCart}
                />
              </React.Suspense>
            </ErrorBoundary>
          </React.Suspense>
        </Shell>
      </ErrorBoundary>
    </>
  );
}

export default App;
