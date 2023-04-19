import React from 'react'
import {
  BrowserRouter,
  Route,
  Routes,
  // Navigate,
  // Outlet,
} from 'react-router-dom'
import { Box, Text } from '@chakra-ui/layout'
// import { About, Header, Footer } from './views/components'

// import ViewLogin from './views/login'

// User
// import { UsersOutlet, UsersList, UserShow } from './views/users'
// import FormUser from './views/users/form'
// import FormConfiguration from './views/users/configuration'

import AuthActions from './actions/Auth'
import Feed from './views/components/Feed'

// const PrivateRoute: React.FC<any> = () => {
//   const validAuth = (): boolean => {
//     const authActions = AuthActions()
//     return authActions.isAuthenticated()
//   }
//   return validAuth() ? <Outlet /> : <Navigate to="login" />
// }

const Routers: React.FC<any> = () => (
  <BrowserRouter>
    {/* <Header /> */}
    {/* <Box minH="80vh" overflowY="auto" m={5}> */}
    <Routes>
      <Route path="/" element={<Feed />} />
      {/* <Route path="login" element={<ViewLogin />} /> */}
      {/* <Route element={<PrivateRoute />}>
          <Route path="users" element={<UsersOutlet />}>
            <Route index element={<UsersList />} />
            <Route path=":id" element={<UserShow />} />
            <Route path="new" element={<FormUser />} />
            <Route path="configuration/:id" element={<FormConfiguration />} />
          </Route>
        </Route> */}

      <Route path="/forbbiden" element={<Text p={'1em'}>Forbbiden</Text>} />
      <Route path="/not-found" element={<Text p={'1em'}>Not Found</Text>} />
      <Route path="*" element={<Text p={'1em'}>Not Found</Text>} />
    </Routes>
    {/* </Box> */}
    {/* <Footer /> */}
  </BrowserRouter>
)

export default Routers
