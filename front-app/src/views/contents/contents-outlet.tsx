import React from 'react'
import { Outlet } from 'react-router-dom'

export const ContentsOutlet: React.FC<any> = () => {
  return (
    <>
      <Outlet />
    </>
  )
}

export default ContentsOutlet
