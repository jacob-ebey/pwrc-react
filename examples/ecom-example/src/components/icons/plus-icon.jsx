import * as React from 'react'

function PlusIcon ({ className }) {
  return (
    <svg
      className={className}
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path d='M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z' />
    </svg>
  )
}

export default PlusIcon
