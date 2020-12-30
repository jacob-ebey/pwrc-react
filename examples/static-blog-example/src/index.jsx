import * as React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import lazy from "react-lazy-ssr";
import { preloadData } from "react-lazy-data";
import { HelmetProvider } from "react-helmet-async";

import App from "./app";

function Client() {
  return (
    <HelmetProvider>
      <BrowserRouter basename={BASE_PATH}>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  );
}

Promise.all([lazy.preloadAll(), preloadData()])
  .then(() => {
    console.info("HYDRATING");
    hydrate(<Client />, document.getElementById("root"));
  })
  .catch((err) => console.error(err));
