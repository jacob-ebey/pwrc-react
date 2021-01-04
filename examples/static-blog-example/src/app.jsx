import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import lazy from 'react-lazy-ssr'

import ErrorBoundary from './components/error-boundary'
import Shell from './components/shell'

import './app.css'

const About = lazy(() => import('./pages/about'))
const Home = lazy(() => import('./pages/home'))
const NotFound = lazy(() => import('./pages/not-found'))
const Post = lazy(() => import('./pages/post'))

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

      <ErrorBoundary fallback='Something went wrong :('>
        <Shell>
          <React.Suspense fallback=''>
            <Switch>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route path='/about'>
                <About />
              </Route>
              <Route path='/post/:slug'>
                <Post />
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </React.Suspense>
        </Shell>
      </ErrorBoundary>
    </>
  )
}

export default App
