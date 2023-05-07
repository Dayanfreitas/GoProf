import React from 'react'
import {
  Box,
  Input,
  Container,
  Editable,
  EditablePreview,
  EditableInput,
  FormControl,
  FormLabel,
  Tooltip,
} from '@chakra-ui/react'

import { QuestionIcon } from '@chakra-ui/icons'
import { ContentType } from './content-type/content-type'

export const ContentsNew: React.FC<any> = () => {
  const [title, setTitle] = React.useState<string>()
  const [summary, setSummary] = React.useState<string>()
  const [background, setBackground] = React.useState<string>()

  return (
    <>
      <Container
        maxW="container.sm"
        p={0}
        borderWidth={1}
        borderRadius={13}
        borderColor={'blackAlpha.500'}
        boxShadow={'lg'}
        height="90vh"
      >
        <Box
          borderRadius={13}
          height="100%"
          bgImage={`url(${background})`}
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
              {/* TODO: SEPARAR FORMULARIO  */}
              <FormControl>
                <FormLabel>
                  Plano de fundo
                  <Tooltip label="Para definir o plano de fundo, utilize uma URL.">
                    <QuestionIcon />
                  </Tooltip>
                </FormLabel>

                <Input
                  type="text"
                  onChange={(e) => {
                    setBackground(e.target.value)
                  }}
                />
              </FormControl>

              {/* <Tooltip label="Escreva aqui o título do conteúdo">
                <QuestionIcon />
              </Tooltip> */}
              <Editable
                defaultValue="Título editável"
                fontSize="2xl"
                value={title}
                onChange={(value) => {
                  setTitle(value)
                }}
              >
                <EditablePreview />
                <EditableInput />
              </Editable>

              {/* <Tooltip label="Escreva aqui o resumo do conteúdo">
                <QuestionIcon />
              </Tooltip> */}
              <Editable
                defaultValue="Resumo editável"
                fontSize="xl"
                fontWeight="bold"
                value={summary}
                onChange={(value) => {
                  setSummary(value)
                }}
              >
                <EditablePreview />
                <EditableInput />
              </Editable>

              <ContentType />
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default ContentsNew