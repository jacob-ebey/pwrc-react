import * as React from 'react'
import cn from 'classnames'

function Spinner ({ className, size = 32 }) {
  return (
    <div className={cn('flex justify-center items-center', className)}>
      <div
        className={`animate-spin rounded-full h-${size} w-${size} border-t-2 border-b-2 border-gray-900`}
      />
    </div>
  )
}

export default Spinner
