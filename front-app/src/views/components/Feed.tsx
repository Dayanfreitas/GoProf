import React, { useEffect, useState } from 'react'
import { Container, Button, Box, Skeleton } from '@chakra-ui/react'
import { FaAngleDown } from 'react-icons/fa'
import { GoogleLogin } from '@react-oauth/google'
import jwtDecode from 'jwt-decode'

import { OauthActions } from '../../actions/Oauth'
import { ContentsActions } from '../../actions/Contents'

import { UserProps } from '../@props/UsersProps'
import Content from './Contents'

const Feed: React.FC = () => {
  const [user, setUser] = useState<UserProps>({} as UserProps)
  const [contents, setContents] = useState<Array<number>>([])
  const [currentContent, setCurrent] = useState<number>(0)

  useEffect(() => {
    fetchAllContents()
  }, [])

  const handleNextContent = () => {
    const next = currentContent + 1
    const last = contents.length - 1

    if (next <= last) {
      setCurrent(next)
    }
  }

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

    setUser(OauthGoogleResponse?.data?.user)
  }

  const fetchAllContents = async () => {
    const response: any = await ContentsActions().getAll()

    if (response?.data?.contents) {
      setContents(response?.data?.contents)
    }
  }

  return (
    <Box minH="100vh" overflowY="hidden" p={5}>
      <GoogleLogin text="continue_with" onSuccess={responseMessage} />

      <Container
        maxW="container.sm"
        p={0}
        borderWidth={1}
        borderRadius={13}
        borderColor={'blackAlpha.500'}
        boxShadow={'lg'}
        height="90vh"
      >
        <Content currentContent={contents[currentContent]} />
      </Container>

      {/* <Box>
        <Button rounded={'lg'}>
          <FaShareAlt width={'4em'} height={'4em'} />
        </Button>
      </Box> */}

      <Button float={'right'} onClick={handleNextContent}>
        <FaAngleDown />
      </Button>
    </Box>
  )
}

export default Feed
