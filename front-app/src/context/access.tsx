import React, { createContext, useContext, useState, useEffect } from 'react'
import { UserProps } from '../views/@props/UsersProps'
import { getUser, saveUser, removeUser, removeToken } from '../services/auth'

export type AccessContextProps = {
  setCurrentUser: any
  currentUser: UserProps
}

type UseAccessContext = {
  setCurrentUser: any
  currentUser: UserProps
  logout: any
}

export const AccessContext = createContext<AccessContextProps>({
  setCurrentUser: () => {},
  currentUser: undefined,
})

export default function AccessProvider({ children }) {
  const [currentUser, setCurrentUser] = useState<UserProps>({
    cache: true,
  } as UserProps)

  useEffect(() => {
    if (getUser()) {
      setCurrentUser(Object.assign(getUser(), { cache: true }))
    }
  }, [])

  useEffect(() => {
    if (!currentUser?.cache) {
      saveUser(currentUser)
    }
  }, [currentUser])

  return (
    <AccessContext.Provider value={{ setCurrentUser, currentUser }}>
      {children}
    </AccessContext.Provider>
  )
}

export function useAccess(): UseAccessContext {
  const context = useContext(AccessContext)

  const { currentUser, setCurrentUser } = context

  const logout = (): void => {
    setCurrentUser({} as UserProps)
    removeToken()
    removeUser()
  }

  return {
    currentUser,
    setCurrentUser,
    logout,
  }
}

// export const FormAdminControl = (props) => {
//     const context = useContext(AccessContext);
//     const isAdmin = context?.currentUser?.permission

//     return (
//         isAdmin ?
//             (props && props.children) ?
//                 props.children
//             : ""
//         : ''
//     )
// }

// export const FormNotAdminControl = (props) => {
//     const context = useContext(AccessContext);
//     const isAdmin = context?.currentUser?.permission

//     return (
//         !isAdmin ?
//             (props && props.children) ?
//                 props.children
//             : ""
//         : ''
//     )
// }

// export const FormAuthControl = (props) => {
//     const context = useContext(AccessContext);
//     const auth = context?.currentUser?.id || false

//     return (
//         auth ?
//             (props && props.children) ?
//                 props.children
//             : ""
//         : ''
//     )
// }

// export const FormNotAuthControl = (props) => {
//     const context = useContext(AccessContext);
//     const auth = context?.currentUser?.id || false

//     return (
//         !auth ?
//             (props && props.children) ?
//                 props.children
//             : ""
//         : ''
//     )
// }
