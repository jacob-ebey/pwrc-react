import * as React from 'react'
import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

import HamburgerIcon from './icons/hamburger-icon'

import global from '../../blog/global'

function Header () {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [setOpen])
  const toggleOpen = useCallback(() => setOpen(!open), [open, setOpen])

  return (
    <header>
      <div className='container mx-auto px-6 py-3'>
        <div className='flex items-center justify-between'>
          <div className='hidden w-full sm:flex sm:items-center' />
          <div className='w-full text-gray-700 sm:text-center text-2xl font-semibold'>
            {global.siteName}
          </div>
          <div className='flex items-center justify-end w-full'>
            <div className='flex sm:hidden'>
              <button
                onClick={toggleOpen}
                type='button'
                className='text-gray-600 hover:text-gray-500 focus:outline-none focus:text-gray-500'
                aria-label='toggle menu'
              >
                <HamburgerIcon className='h-6 w-6 fill-current' />
              </button>
            </div>
          </div>
        </div>
        <nav
          className={cn(
            'sm:flex sm:justify-center sm:items-center mt-4',
            !open && 'hidden'
          )}
        >
          <div className='flex flex-col sm:flex-row'>
            <Link
              className='mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0'
              to='/'
              onClick={close}
            >
              Home
            </Link>
            <Link
              className='mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0'
              to='/about'
              onClick={close}
            >
              About
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
