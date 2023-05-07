import React from 'react'
import {
  BrowserRouter,
  Route,
  Routes,
  // Navigate,
  // Outlet,
} from 'react-router-dom'
import { Text } from '@chakra-ui/layout'

import AuthActions from './actions/Auth'
import Feed from './views/components/Feed'
import { Header } from './views/components/Header'
import { Terms } from './views/components'
import { ContentsOutlet, ContentsNew } from './views/contents'

// const PrivateRoute: React.FC<any> = () => {
//   const validAuth = (): boolean => {
//     const authActions = AuthActions()
//     return authActions.isAuthenticated()
//   }
//   return validAuth() ? <Outlet /> : <Navigate to="login" />
// }

const Routers: React.FC<any> = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" exact element={<Feed />} />
      <Route path="/feed/:id" element={<Feed />} />

      <Route path="/contents" element={<ContentsOutlet />}>
        <Route path="new" element={<ContentsNew />} />
      </Route>
      {/* <Route path="login" element={<ViewLogin />} /> */}
      {/* <Route element={<PrivateRoute />}>
          <Route path="users" element={<UsersOutlet />}>
            <Route path=":id" element={<UserShow />} />
            <Route path="new" element={<FormUser />} />
            <Route path="configuration/:id" element={<FormConfiguration />} />
          </Route>
        </Route> */}

      <Route path="/terms" element={<Terms />} />
      <Route path="/forbbiden" element={<Text p={'1em'}>Forbbiden</Text>} />
      <Route path="/not-found" element={<Text p={'1em'}>Not Found</Text>} />
      <Route path="*" element={<Text p={'1em'}>Not Found</Text>} />
    </Routes>
  </BrowserRouter>
)

export default Routers
