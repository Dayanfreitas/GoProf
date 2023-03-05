import React from 'react'
import { Outlet } from 'react-router-dom'

export const UsersOutlet: React.FC<any> = () => {
  return (
    <>
      <Outlet />
    </>
  )
}
