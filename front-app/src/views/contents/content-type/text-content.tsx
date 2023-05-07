import React from 'react'
import { Textarea, FormControl, FormLabel } from '@chakra-ui/react'

export const TextContent: React.FC<{}> = () => {
  const [description, setDescription] = React.useState<string>()

  return (
    <>
      <FormControl>
        <FormLabel>Descrição do conteúdo</FormLabel>
        <Textarea
          placeholder="Descrição do conteúdo"
          onChange={(e) => {
            setDescription(e.target.value)
          }}
        />
      </FormControl>
      {description}
    </>
  )
}

export default TextContent
