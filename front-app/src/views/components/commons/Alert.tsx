import React from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalCloseButton,
} from '@chakra-ui/react'

type AlertProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  text: string
  closeText: string
  actionText: string
  actionCallback: () => void
}

export const Alert: React.FC<AlertProps> = ({
  isOpen,
  onClose,
  title,
  text,
  closeText,
  actionText,
  actionCallback,
}) => {
  return (
    <>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{text}</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              {closeText}
            </Button>
            <Button variant="ghost" onClick={actionCallback}>
              {actionText}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
