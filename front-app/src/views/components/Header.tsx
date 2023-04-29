import React from 'react'
import {
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'

import { useAccess } from '../../context/access'
import { GoogleLogin } from '@react-oauth/google'
import { OauthActions } from '../../actions/Oauth'
import jwtDecode from 'jwt-decode'

export const Header: React.FC = () => {
  const { currentUser, setCurrentUser, logout } = useAccess()

  const responseMessage = async (response) => {
    const credential: any = jwtDecode(response.credential)

    const OauthGoogleResponse: any = await OauthActions().OauthGoogle({
      email: credential.email,
      name: credential.name,
      given_name: credential.given_name,
      family_name: credential.family_name,
      image_path: credential.picture,
      sub: credential.sub,
    })

    setCurrentUser(OauthGoogleResponse.data.user)
  }

  return (
    <>
      <Flex
        as="nav"
        wrap="wrap"
        justifyContent={'flex-end'}
        padding={2}
        color="blackAlpha.800"
        borderColor="blackAlpha.500"
      >
        {!currentUser.id && (
          <GoogleLogin text="continue_with" onSuccess={responseMessage} />
        )}
        {currentUser.id && (
          <Flex alignItems={'center'}>
            <Box m={2}>
              <Menu>
                <MenuButton as={Button}>
                  <Text as="b" color={'white'}>
                    {currentUser.name} {currentUser.last_name}
                  </Text>
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Box>

            <Avatar
              name={currentUser.name && currentUser.last_name}
              src={currentUser.image_path}
            />
          </Flex>
        )}
      </Flex>
    </>
  )
}
