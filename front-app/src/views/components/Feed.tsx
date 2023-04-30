import React, { useEffect, useState } from 'react'
import { Container, Button, Box, Flex, useDisclosure } from '@chakra-ui/react'
import { FaAngleDown, FaShareAlt } from 'react-icons/fa'
import { ContentsActions } from '../../actions/Contents'
import { BsFlagFill } from 'react-icons/bs'

import Content from './Contents'
import { SharedPopUp } from './commons/SharedPopUp'
import { useParams } from 'react-router-dom'

const Feed: React.FC = () => {
  const { id } = useParams()
  console.log('@id', id)

  const {
    isOpen: isOpenShared,
    onOpen: onOpenShared,
    onClose: onCloseShared,
  } = useDisclosure()

  const [contents, setContents] = useState<number[]>([])
  const [currentContent, setCurrent] = useState<number>(0)

  useEffect(() => {
    void fetchAllContents()
  }, [])

  const handleNextContent = (): void => {
    if (id) {
      window.location.href = '/'
    }
    const next = currentContent + 1
    const last = contents.length - 1

    if (next <= last) {
      setCurrent(next)
    }
  }

  const fetchAllContents = async (): Promise<void> => {
    const response: any = await ContentsActions().getAll()

    if (response?.data?.contents) {
      setContents(response?.data?.contents)
    }
  }

  return (
    <Box p={5}>
      <Container
        maxW="container.sm"
        p={0}
        borderWidth={1}
        borderRadius={13}
        borderColor={'blackAlpha.500'}
        boxShadow={'lg'}
        // height="90vh"
      >
        {id && <Content currentContent={Number(id)} />}
        {!id && <Content currentContent={contents[currentContent]} />}
      </Container>

      <Flex>
        <Button m={2} rounded={'lg'} onClick={onOpenShared}>
          <FaShareAlt width={'4em'} height={'4em'} />
        </Button>
        <Button m={2} rounded={'lg'}>
          <BsFlagFill width={'4em'} height={'4em'} />
        </Button>
      </Flex>
      <Button m={2} float={'right'} onClick={handleNextContent}>
        <FaAngleDown />
      </Button>

      <SharedPopUp
        idContent={Number(id) || contents[currentContent]}
        isOpen={isOpenShared}
        onClose={onCloseShared}
      />
    </Box>
  )
}

export default Feed
