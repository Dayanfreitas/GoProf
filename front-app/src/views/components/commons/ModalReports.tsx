import React, { useEffect, useState } from 'react'
import { ModalReportsProps } from '../../@props/ModalReportsProps'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useToast,
  ModalFooter,
  Skeleton,
  Button,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react'
import { ContentsProps } from '../../@props/ContentsProps'
import { ContentsActions, ReportsActionParams } from '../../../actions/Contents'

export const ModalReports: React.FC<ModalReportsProps> = ({
  idContent,
  isOpen,
  onClose,
}) => {
  const toast = useToast()
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [current, setCurrent] = useState<ContentsProps>()
  const [value, setValue] = React.useState('HATE_SPEECH')

  useEffect(() => {
    if (!idContent) {
      return
    }
    fetchContentById(idContent)
  }, [idContent, isOpen])

  const fetchContentById = async (id: number) => {
    const response: any = await ContentsActions().getById(id)
    response?.data?.content && setCurrent(response?.data?.content)
    setIsLoaded(true)
  }

  const reports = async () => {
    try {
      const params: ReportsActionParams = {
        content_id: idContent,
        type_report: value,
      }

      await ContentsActions().reports(params)

      toast({
        title: 'Denúncia realizada com sucesso',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch {
      toast({
        title: 'Erro ao denunciar conteúdo',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }

    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent marginX={'10px'}>
        <Skeleton isLoaded={isLoaded}>
          <ModalHeader>Denunciar conteúdo</ModalHeader>
        </Skeleton>

        <ModalCloseButton />
        <ModalBody>
          <Skeleton isLoaded={isLoaded}>
            <Text as="b">Denunciar conteúdo - {current?.title}</Text>

            <RadioGroup onChange={setValue} value={value}>
              <Stack direction="column">
                <Radio value="HATE_SPEECH">Discurso de ódio</Radio>
                <Radio value="NUDITY_AND_SEXUAL_CONTENT">
                  Nudez e conteúdo sexual
                </Radio>
                <Radio value="HARASSMENT_AND_BULLYING">
                  Assédio e bullying
                </Radio>
                <Radio value="VIOLENCE_AND_DISTURBING_CONTENT">
                  Violência e conteúdo perturbador
                </Radio>
                <Radio value="COPYRIGHT_INFRINGEMENT">
                  Violação de direitos autorais
                </Radio>
                <Radio value="FRAUD_AND_PHISHING">Fraude e phishing</Radio>
                <Radio value="INCITEMENT_TO_VIOLENCE">
                  Discurso de incitamento à violência
                </Radio>
                <Radio value="TERRORISM_SPEECH">Discurso de terrorismo</Radio>
                <Radio value="FAKE_NEWS_AND_DISINFORMATION">
                  Notícias falsas e desinformação
                </Radio>
                <Radio value="OTHERS">Outros</Radio>
              </Stack>
            </RadioGroup>
          </Skeleton>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" onClick={reports}>
            Denunciar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
