import * as React from "react";
import { useCallback, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import lazy from "react-lazy-ssr";

import ErrorBoundary from "./components/error-boundary";
import Shell from "./components/shell";

import "./app.css";

const Home = lazy(() => import("./pages/home"));
const Blog = lazy(() => import("./pages/blog"));
const Post = lazy(() => import("./pages/blog-post"));
const NotFound = lazy(() => import("./pages/not-found"));

function App() {
  return (
    <>
      <Helmet htmlAttributes={{ lang: "en-us" }}>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="manifest" content={BASE_PATH + "/manifest.json"} />
        <link
          rel="icon"
          type="image/x-icon"
          href={BASE_PATH + "/favicon.ico"}
        />
      </Helmet>

      <Shell>
        <ErrorBoundary fallback="Something went wrong :(">
          <React.Suspense fallback="">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/blog/:slug">
                <Post />
              </Route>
              <Route exact path="/blog">
                <Blog />
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </React.Suspense>
        </ErrorBoundary>
      </Shell>
    </>
  );
}

export default App;
