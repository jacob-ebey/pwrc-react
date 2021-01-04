import * as React from 'react'

function HamburgerIcon ({ className }) {
  return (
    <svg viewBox='0 0 24 24' className={className}>
      <path
        fillRule='evenodd'
        d='M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z'
      />
    </svg>
  )
}

export default HamburgerIcon
