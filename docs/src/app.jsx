import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import lazy from 'react-lazy-ssr'

import ErrorBoundary from './components/error-boundary'
import Shell from './components/shell'

import './app.css'

const Blog = lazy(() => import('./pages/blog'))
const Post = lazy(() => import('./pages/blog-post'))
const Docs = lazy(() => import('./pages/docs'))
const Home = lazy(() => import('./pages/home'))
const NotFound = lazy(() => import('./pages/not-found'))

/* eslint-disable no-undef */
const basePath = BASE_PATH
/* eslint-enable no-undef */

function App () {
  return (
    <>
      <Helmet htmlAttributes={{ lang: 'en-us' }}>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='manifest' content={basePath + '/manifest.json'} />
        <link
          rel='icon'
          type='image/x-icon'
          href={basePath + '/favicon.ico'}
        />
      </Helmet>

      <Shell>
        <ErrorBoundary fallback='Something went wrong :('>
          <React.Suspense fallback=''>
            <Switch>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route path='/docs'>
                <Docs />
              </Route>
              <Route path='/blog/:slug'>
                <Post />
              </Route>
              <Route path='/blog'>
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
  )
}

export default App
