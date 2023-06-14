import React from 'react'
import { Textarea, FormControl, FormLabel } from '@chakra-ui/react'

import { useFormContent } from './../../../context/form-content'

export const TextContent: React.FC<{}> = () => {
  const { setPropInState } = useFormContent()

  return (
    <>
      <FormControl>
        <FormLabel>Descrição do conteúdo</FormLabel>
        <Textarea
          placeholder="Descrição do conteúdo"
          onChange={(e) => {
            setPropInState('description', e.target.value)
          }}
        />
      </FormControl>
    </>
  )
}

export default TextContent
