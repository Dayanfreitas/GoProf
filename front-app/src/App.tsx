import React from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Routers from './routes'
import AccessProvider from './context/access'
import { GoogleOAuthProvider } from '@react-oauth/google'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
}

export const theme = extendTheme({ config })

export const App: React.FC = () => {
  return (
    <>
      <GoogleOAuthProvider clientId="681133748792-j10re14i126eeker7cmgnuudm8mq8tfo.apps.googleusercontent.com">
        <ChakraProvider theme={theme}>
          <AccessProvider>
            <Routers></Routers>
          </AccessProvider>
        </ChakraProvider>
      </GoogleOAuthProvider>
    </>
  )
}
