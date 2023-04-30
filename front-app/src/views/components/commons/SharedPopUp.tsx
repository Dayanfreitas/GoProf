import React, { useEffect, useState } from 'react'
import { SharedPopUpProps } from '../../@props/SharedPopUpProps'
import {
  Flex,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  StackDivider,
  Link,
  useToast,
  Skeleton,
  ModalFooter,
} from '@chakra-ui/react'
import { LinkIcon } from '@chakra-ui/icons'
import {
  FaFacebookSquare,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
} from 'react-icons/fa'
import { ContentsActions } from '../../../actions/Contents'

export const SharedPopUp: React.FC<SharedPopUpProps> = ({
  idContent,
  isOpen,
  onClose,
}) => {
  const toast = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const [whatsappLink, setWhatsappLink] = useState<string>()
  const [facebookLink, setFacebookLink] = useState<string>()
  const [urlLink, setUrlLink] = useState<string>()

  useEffect(() => {
    if (isOpen) {
      fetchLinks()
    }
  }, [isOpen])

  const fetchLinks = async () => {
    setIsLoading(true)

    const response: any = await ContentsActions().getShareLinks(idContent)
    setLinks(response.data)
    setIsLoading(false)
  }

  const setLinks = (data) => {
    const { facebook, whatsapp, base } = data.links
    console.log(facebook)
    console.log(whatsapp)

    setFacebookLink(facebook)
    setWhatsappLink(whatsapp)
    setUrlLink(base)
  }

  const linksShared = [
    {
      name: 'Whatsapp',
      active: true,
      onClick: () => {
        window.open(whatsappLink, 'Whatsapp')
      },
      // eslint-disable-next-line react/display-name
      icon: () => <FaWhatsapp size="20px" />,
    },
    {
      name: 'Facebook',
      active: true,
      onClick: () => {
        openFacebook()
      },
      // eslint-disable-next-line react/display-name
      icon: () => <FaFacebookSquare size="20px" />,
    },
    {
      name: 'Copiar link',
      active: true,
      onClick: () => {
        copyLink()
      },
      // eslint-disable-next-line react/display-name
      icon: () => <LinkIcon />,
    },
  ]

  const openFacebook = () => {
    const width = 600
    const height = 400
    const left = (window.innerWidth - width) / 2
    const top = (window.innerHeight - height) / 2
    const url = facebookLink

    const opts =
      'status=1' +
      ',width=' +
      (width + 50) +
      ',height=' +
      height +
      ',top=' +
      top +
      ',left=' +
      left

    window.open(facebookLink, 'Facebook', opts)
    return false
  }

  const copyLink = () => {
    navigator.clipboard.writeText(urlLink)
    navigator.clipboard.readText().then((clipText) => {
      toast({
        title: 'Link copiado.',
        description: 'O link foi copiado para a área de transferência.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    })

    return false
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent marginX={'10px'}>
          <ModalHeader>Compartilhar</ModalHeader>

          <ModalCloseButton />
          <ModalBody>
            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={4}
              align="stretch"
            >
              {linksShared.map(({ name, onClick, icon, active }) => {
                return isLoading ? (
                  <Skeleton key={name} isLoaded={!isLoading} height="40px" />
                ) : (
                  active && (
                    <Flex key={name}>
                      <Box mr={2}>{icon()}</Box>
                      <Link onClick={onClick}>{name}</Link>
                    </Flex>
                  )
                )
              })}
            </VStack>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  )
}
