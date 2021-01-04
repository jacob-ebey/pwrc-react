import * as React from 'react'
import { useCallback, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import lazy from 'react-lazy-ssr'

import ErrorBoundary from './components/error-boundary'
import Shell from './components/shell'

import CartResource from './resources/cart'

import './app.css'

const Cart = lazy(() => import('./components/cart'), { ssr: false })

// Routes
const About = lazy(() => import('./pages/about'))
const Home = lazy(() => import('./pages/home'))
const NotFound = lazy(() => import('./pages/not-found'))
const Pdp = lazy(() => import('./pages/pdp'))

/* eslint-disable no-undef */
const basePath = BASE_PATH
/* eslint-enable no-undef */

function App () {
  const cartResource = CartResource.use(1)

  const [cartOpen, setCartOpen] = useState(false)
  const toggleCart = useCallback(() => setCartOpen(!cartOpen), [
    cartOpen,
    setCartOpen
  ])
  const closeCart = useCallback(() => setCartOpen(false), [setCartOpen])

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

      <Shell toggleCart={toggleCart}>
        <ErrorBoundary fallback='Something went wrong :('>
          <React.Suspense fallback=''>
            <Switch>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route path='/about'>
                <About />
              </Route>
              <Route path='/pdp/:productId'>
                <Pdp />
              </Route>

              <Route>
                <NotFound />
              </Route>
            </Switch>
            <ErrorBoundary>
              <React.Suspense fallback=''>
                <Cart
                  cartResource={cartResource}
                  open={cartOpen}
                  onClose={closeCart}
                />
              </React.Suspense>
            </ErrorBoundary>
          </React.Suspense>
        </ErrorBoundary>
      </Shell>
    </>
  )
}

export default App
