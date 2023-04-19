import React from 'react'
import { ChakraProvider, ColorModeContext, extendTheme } from '@chakra-ui/react'
import Routers from './routes'
import AccessProvider from './context/access'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
}

export const theme = extendTheme({ config })

export const App: React.FC = () => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <AccessProvider>
          <Routers></Routers>
        </AccessProvider>
      </ChakraProvider>
    </>
  )
}
