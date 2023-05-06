import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Button,
  Box,
  Flex,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { FaAngleDown, FaShareAlt } from 'react-icons/fa'
import { ContentsActions } from '../../actions/Contents'
import { BsFlagFill } from 'react-icons/bs'

import Content from './Contents'
import { SharedPopUp } from './commons/SharedPopUp'
import { useParams } from 'react-router-dom'
import { ModalReports } from './commons/ModalReports'

const Feed: React.FC = () => {
  const toast = useToast()
  const navigate = useNavigate()
  const { id } = useParams()

  const {
    isOpen: isOpenShared,
    onOpen: onOpenShared,
    onClose: onCloseShared,
  } = useDisclosure()

  const {
    isOpen: isOpenModalReports,
    onOpen: onOpenModalReports,
    onClose: onCloseModalReports,
  } = useDisclosure()

  const [contents, setContents] = useState<number[]>([])
  const [currentContent, setCurrent] = useState<number>(0)

  useEffect(() => {
    void fetchAllContents()
  }, [])

  const handleNextContent = (): void => {
    if (id) {
      navigate('/')
    }
    const next = currentContent + 1
    const last = contents.length - 1

    if (next <= last) {
      setCurrent(next)
    }
  }

  const fetchAllContents = async (): Promise<void> => {
    try {
      const response: any = await ContentsActions().getAll()

      if (response?.data?.contents) {
        setContents(response?.data?.contents)
      }
    } catch (error) {
      toast({
        title: 'Erro ao carregar conteúdos',
        description: 'Tente novamente mais tarde',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
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

      <Flex justifyContent={'center'}>
        {/* <Button m={2} onClick={handleNextContent}>
          <FaAngleDown />
        </Button> */}

        <Button m={2} rounded={'lg'} onClick={onOpenShared}>
          <FaShareAlt width={'4em'} height={'4em'} />
        </Button>

        <Button m={2} rounded={'lg'} onClick={onOpenModalReports}>
          <BsFlagFill width={'4em'} height={'4em'} />
        </Button>

        <Button m={2} onClick={handleNextContent}>
          <FaAngleDown />
        </Button>
      </Flex>

      <SharedPopUp
        idContent={Number(id) || contents[currentContent]}
        isOpen={isOpenShared}
        onClose={onCloseShared}
      />

      <ModalReports
        idContent={Number(id) || contents[currentContent]}
        isOpen={isOpenModalReports}
        onClose={onCloseModalReports}
      />
    </Box>
  )
}

export default Feed
