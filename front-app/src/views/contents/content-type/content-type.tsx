import React from 'react'
import {
  FormControl,
  FormLabel,
  RadioGroup,
  HStack,
  Radio,
} from '@chakra-ui/react'

import { TextContent } from './text-content'
import { VideoContent } from './video-content'

export const ContentType: React.FC<{}> = () => {
  const contentType = {
    text: <TextContent />,
    video: <VideoContent />,
  }

  const [type, setType] = React.useState<string>('text')

  return (
    <>
      <FormControl as="fieldset">
        <FormLabel as="legend">Selecione o tipo do conteúdo</FormLabel>
        <RadioGroup
          defaultValue={type}
          onChange={(e) => {
            setType(e)
          }}
        >
          <HStack spacing="24px">
            <Radio value="text">Texto</Radio>
            <Radio value="video">Video</Radio>
          </HStack>
        </RadioGroup>
      </FormControl>

      {contentType[type]}
    </>
  )
}

export default ContentType
