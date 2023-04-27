import React, { useState } from 'react'
import { Container, Button, Box } from '@chakra-ui/react'
import { FaAngleDown } from 'react-icons/fa'
import { GoogleLogin } from '@react-oauth/google'
import jwtDecode from 'jwt-decode'

const Feed = () => {
  const contents = [
    {
      id: 1,
      title: 'Como a tecnologia pode melhorar o gerenciamento de projetos',
      summary: 'Gerenciamento de projetos',
      description: `
        O texto "Como a tecnologia pode melhorar o gerenciamento de projetos" aborda os benefícios que a tecnologia pode trazer para o gerenciamento de projetos em diferentes setores e áreas de atuação. O conteúdo começa com uma breve introdução sobre o que é gerenciamento de projetos e sua importância para o sucesso de uma empresa ou organização. Em seguida, são apresentados exemplos de tecnologias que podem ser usadas para otimizar o processo de gerenciamento de projetos, como softwares de gestão de projetos, ferramentas de colaboração e comunicação, entre outros.

        O texto também aborda as vantagens da tecnologia para o gerenciamento de projetos, como a melhoria da eficiência e produtividade, o aumento da transparência e da comunicação entre as equipes, a possibilidade de acompanhar e monitorar o progresso do projeto em tempo real, entre outras. Além disso, são apresentados casos de sucesso de empresas que utilizaram a tecnologia para melhorar seus processos de gerenciamento de projetos e alcançaram resultados significativos.
        
        Ao final, o texto conclui destacando a importância de estar atualizado sobre as novas tecnologias e tendências na área de gerenciamento de projetos, e de como a tecnologia pode ser um aliado fundamental para alcançar o sucesso nos projetos e na carreira profissional.
      `,
      background: 'https://picsum.photos/seed/2/600/400',
    },
    { id: 2, summary: 'Title 2', description: 'Description 2' },
    { id: 3, summary: 'Title 3', description: 'Description 3' },
    { id: 4, summary: 'Title 4', description: 'Description 4' },
  ]

  const [user, setUser] = useState({} as any)
  const [currentContent, setCurrent] = useState(contents[0])

  const handleNextContent = () => {
    setCurrent(contents[currentContent.id++])
  }

  const responseMessage = (response) => {
    const credential: any = jwtDecode(response.credential)

    setUser({
      email: credential.email,
      name: credential.name,
      given_name: credential.given_name,
      family_name: credential.family_name,
      picture: credential.picture,
      sub: credential.sub,
    })
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
        <Box height="100%">
          {currentContent && (
            <Box
              borderRadius={13}
              height="100%"
              bgImage={`url(${currentContent.background})`}
              opacity={0.8}
              bgSize="cover"
              bgPosition="center"
              bgRepeat="no-repeat"
            >
              <Box
                borderRadius={13}
                height="100%"
                bgGradient="linear(to-b, rgba(0,0,0,0.5), rgba(0,0,0,0.5))"
              >
                <Box p={5}>
                  <Box
                    color={'white'}
                    fontWeight={'bold'}
                    fontSize={'2xl'}
                    textShadow={'0 0 2px #000'}
                  >
                    {currentContent.title}
                  </Box>
                  <Box
                    color={'white'}
                    fontWeight={'bold'}
                    fontSize={'xl'}
                    textShadow={'0 0 2px #000'}
                  >
                    {currentContent.summary}
                  </Box>
                  <Box
                    color={'white'}
                    fontWeight={'bold'}
                    fontSize={'md'}
                    textShadow={'0 0 2px #000'}
                    textAlign={'justify'}
                    height={'65vh'}
                    overflowY={'auto'}
                    p={2}
                  >
                    {currentContent.description}
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
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
