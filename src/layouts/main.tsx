import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const main: React.FC<Props> = (
  { children }
) => {
  return (
    <>
      {children}
    </>
  )
}

export default main