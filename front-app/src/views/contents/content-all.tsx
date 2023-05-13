import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  Flex,
  Button,
  Image,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaEye, FaTrash, FaFolderOpen } from 'react-icons/fa'
import { BsFillCloudArrowUpFill } from 'react-icons/bs'
import { ContentsActions } from './../../actions'

export const ContentsAll: React.FC<any> = () => {
  const navigate = useNavigate()
  const [hasFiled, setHasFiled] = React.useState<boolean>(false)
  const [contents, setContents] = React.useState<any[]>([])

  useEffect(() => {
    apiFetchAllMyContents()
  }, [])

  const apiFetchAllMyContents = async () => {
    const response = await ContentsActions().getAll({ complete_select: true })
    setContents(response.data.contents)
  }

  const archive = (): void => {
    if (hasFiled) {
      alert('Deseja realmente publicar?')
    } else {
      alert('Deseja realmente arquivar?')
    }

    const params = {}
  }

  return (
    <>
      <Container maxW="container.lg">
        <Flex justifyContent="space-evenly" flexWrap="wrap">
          {contents &&
            contents.map((content) => {
              return (
                <>
                  <Box
                    maxW={'445px'}
                    w={'full'}
                    bg={useColorModeValue('white', 'gray.900')}
                    boxShadow={'2xl'}
                    rounded={'md'}
                    p={6}
                    overflow={'hidden'}
                    mt={2}
                  >
                    <Box
                      h={'210px'}
                      bg={'gray.100'}
                      mt={-6}
                      mx={-6}
                      mb={6}
                      pos={'relative'}
                    >
                      <Image
                        maxH={'210px'}
                        width={'full'}
                        src={
                          'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
                        }
                      />
                    </Box>
                    <Stack>
                      {hasFiled && (
                        <Text
                          color={'red.500'}
                          textTransform={'uppercase'}
                          fontWeight={800}
                          fontSize={'sm'}
                          letterSpacing={1.1}
                        >
                          Arquivado
                        </Text>
                      )}
                      {!hasFiled && (
                        <Text
                          color={'green.500'}
                          textTransform={'uppercase'}
                          fontWeight={800}
                          fontSize={'sm'}
                          letterSpacing={1.1}
                        >
                          Publicado
                        </Text>
                      )}
                      <Heading
                        color={useColorModeValue('gray.700', 'white')}
                        fontSize={'2xl'}
                        fontFamily={'body'}
                      >
                        {content.title}
                      </Heading>
                      <Text color={'gray.500'}>{content.summary}</Text>
                    </Stack>
                    <Stack
                      mt={6}
                      direction={'row'}
                      spacing={4}
                      align={'center'}
                    >
                      <Button
                        colorScheme="blue"
                        variant="outline"
                        onClick={() => {
                          navigate('/feed/1')
                        }}
                      >
                        <FaEye />
                      </Button>

                      <Button
                        colorScheme={hasFiled ? 'green' : 'red'}
                        rightIcon={
                          hasFiled ? (
                            <BsFillCloudArrowUpFill />
                          ) : (
                            <FaFolderOpen />
                          )
                        }
                        onClick={archive}
                      >
                        {hasFiled ? 'Publicar' : 'Arquivar'}
                      </Button>
                    </Stack>
                  </Box>{' '}
                </>
              )
            })}
        </Flex>
      </Container>
    </>
  )
}

export default ContentsAll