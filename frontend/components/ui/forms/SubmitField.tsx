'use client'

import React from 'react'
import clsx from 'clsx'

type SubmitFieldProps = {
  isLoading?: boolean
}

const SubmitField: React.FC<React.PropsWithChildren<SubmitFieldProps>> = ({
  children,
  isLoading
}) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={clsx(
        'block h-10 w-full rounded bg-purple-600 font-medium text-white',
        isLoading && 'bg-purple-400'
      )}
    >
      {children}
    </button>
  )
}

export default SubmitField
