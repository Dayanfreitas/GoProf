import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import Routers from './routes'
import AccessProvider from './context/access'

export const App: React.FC = () => {
  return (
    <>
      <ChakraProvider>
        <AccessProvider>
          <Routers></Routers>
        </AccessProvider>
      </ChakraProvider>
    </>
  )
}
