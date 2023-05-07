import React from 'react'
import {
  Box,
  Text,
  Textarea,
  Input,
  Container,
  Editable,
  EditablePreview,
  EditableInput,
} from '@chakra-ui/react'

export const ContentsNew: React.FC<any> = () => {
  const [title, setTitle] = React.useState<string>()
  const [summary, setSummary] = React.useState<string>()
  const [description, setDescription] = React.useState<string>()
  const [background, setBackground] = React.useState<string>()

  return (
    <>
      <Box>Título:{title}</Box>
      <Box>Resumo: {summary}</Box>
      <Box>Descrição: {description}</Box>
      <Box>Background: {background}</Box>
      <Input
        onChange={(e) => {
          setBackground(e.target.value)
        }}
      />

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

              <Textarea
                placeholder="Here is a sample placeholder"
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
              />
              {description}
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default ContentsNew
