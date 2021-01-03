import * as React from "react";
import { Link, NavLink, Route, Switch } from "react-router-dom";
import cn from "classnames";

import lazy from "react-lazy-ssr";

import ErrorBoundary from "../../components/error-boundary";

import "../../styles/markdown.css";

const Integrations = lazy(() => import("./content/integrations.mdx"));
const Intro = lazy(() => import("./content/intro.mdx"));
const QuickStart = lazy(() => import("./content/quick-start.mdx"));
const NotFound = lazy(() => import("../not-found"));

function Docs() {
  const [open, setOpen] = React.useState(false);
  const toggleOpen = React.useCallback(() => setOpen(!open), [open, setOpen]);
  const setClosed = React.useCallback(() => setOpen(false), [setOpen]);

  return (
    <div className="md:flex flex-col md:flex-row w-full">
      <div className="flex flex-col w-full md:w-64 text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0">
        <div className="flex-shrink-0 px-6 py-4 flex flex-row items-center justify-between">
          <Link
            to="/docs"
            className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline"
          >
            Docs
          </Link>
          <button
            className="rounded-lg md:hidden rounded-lg focus:outline-none focus:shadow-outline"
            onClick={toggleOpen}
          >
            <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
              {open ? null : (
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              )}
              {open ? (
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              ) : null}
            </svg>
          </button>
        </div>
        <nav
          className={cn(
            "flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto",
            open ? "block" : "hidden"
          )}
        >
          <NavLink
            activeClassName="bg-gray-200"
            className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
            to="/docs/quick-start"
            onClick={setClosed}
          >
            Quick Start
          </NavLink>
          <NavLink
            activeClassName="bg-gray-200"
            className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
            to="/docs/cli"
            onClick={setClosed}
          >
            CLI
          </NavLink>
          <NavLink
            activeClassName="bg-gray-200"
            className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
            to="/docs/integrations"
            onClick={setClosed}
          >
            Integrations
          </NavLink>
        </nav>
      </div>
      <div className="container px-6 w-full max-w-screen-md mx-auto">
        <main className="my-8 markdown">
          <ErrorBoundary fallback="Something went wrong :(">
            <React.Suspense fallback="">
              <Switch>
                <Route exact path="/docs">
                  <Intro />
                </Route>
                <Route path="/docs/integrations">
                  <Integrations />
                </Route>
                <Route path="/docs/quick-start">
                  <QuickStart />
                </Route>
                <Route>
                  <NotFound />
                </Route>
              </Switch>
            </React.Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}

export default Docs;
