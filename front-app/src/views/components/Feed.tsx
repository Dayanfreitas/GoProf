import React, { useEffect, useState } from 'react'
import { Container, Button, Box } from '@chakra-ui/react'
import { FaAngleDown } from 'react-icons/fa'
import { ContentsActions } from '../../actions/Contents'

import Content from './Contents'
import { useAccess } from '../../context/access'

const Feed: React.FC = () => {
  const [contents, setContents] = useState<Array<number>>([])
  const [currentContent, setCurrent] = useState<number>(0)
  const { currentUser, setCurrentUser } = useAccess()

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

  const fetchAllContents = async () => {
    const response: any = await ContentsActions().getAll()

    if (response?.data?.contents) {
      setContents(response?.data?.contents)
    }
  }

  return (
    <Box minH="100vh" overflowY="hidden" p={5}>
      {currentUser && currentUser.id}
      {currentUser && currentUser.name}
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
