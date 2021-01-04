import * as React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import lazy from 'react-lazy-ssr'
import { preloadData } from 'react-lazy-data'
import { HelmetProvider } from 'react-helmet-async'

import App from '@pwrc/app'

/* eslint-disable no-undef */
const basename = BASE_PATH
/* eslint-enable no-undef */

function Client () {
  return (
    <HelmetProvider>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  )
}

Promise.all([lazy.preloadAll(), preloadData()])
  .then(() => {
    console.info('HYDRATING')
    hydrate(<Client />, document.getElementById('root'))
  })
  .catch((err) => console.error(err))
