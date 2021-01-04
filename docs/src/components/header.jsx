import * as React from 'react'
import { Link } from 'react-router-dom'

import GithubIcon from './icons/github'

import global from '../../content/global'

function Header () {
  return (
    <header className='text-gray-700 bg-white border-t border-b body-font'>
      <div className='container p-5 mx-auto flex items-center flex-row '>
        <Link
          to='/'
          className='flex items-center w-40 font-medium text-gray-900 title-font mb-0'
        >
          {global.siteName}
        </Link>
        <nav className='flex items-center justify-center ml-4 text-base'>
          <Link
            to='/docs'
            className='mr-5 text-sm font-semibold text-gray-700 rounded-xl hover:text-gray-800'
          >
            Docs
          </Link>
          <Link
            to='/blog'
            className='mr-5 text-sm font-semibold text-gray-700 rounded-xl hover:text-gray-800'
          >
            Blog
          </Link>
        </nav>
        <button className='p-1 ml-auto rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
          <span className='sr-only'>Github</span>

          <a
            aria-label=''
            href='https://github.com/jacob-ebey/pwrc-react'
          >
            <GithubIcon className='w-6 h-6' />
          </a>
        </button>
      </div>
    </header>
  )
}

export default Header
