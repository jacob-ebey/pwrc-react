import * as React from 'react'
import { Helmet } from 'react-helmet-async'

import '../styles/markdown.css'

import TextHero from '../components/text-hero'

import global from '../../blog/global'

function About () {
  return (
    <>
      <Helmet htmlAttributes={{ lang: 'en-us' }}>
        <title>{global.siteName} | About</title>
        <meta name='description' content='Learn more about @PWRC' />
      </Helmet>
      <div className='container px-6 w-full max-w-full lg:max-w-4xl xl:max-w-screen-1xl mx-auto'>
        <main className='my-8'>
          <TextHero
            title='Built with @PWRC'
            details='A better experience for your developers and less stress on your team team.'
          />

          <div className='my-8'>
            <article className='markdown'>
              <h1>Hello, World!</h1>
            </article>
          </div>
        </main>
      </div>
    </>
  )
}

export default About
