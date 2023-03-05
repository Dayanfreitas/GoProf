import React, { useEffect, useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
} from '@chakra-ui/react'

function ModalDefault(props) {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('dasdadasds');

    const [primaryAction, setPrimaryAction] = useState({});
    const [secondaryAction, setSecondaryAction] = useState({});
    const [isOpen, setOpen] = useState(false)

    useEffect(() => {
        setTitle(props?.title || 'Title');
        setText(props?.text || 'Text');

        setPrimaryAction({
            name: 'primaryAction',
            cb: () => {
                console.log('primaryAction')
            } 
        });

        setSecondaryAction({
            name: 'secondaryAction',
            cb: () => {
                console.log('secondaryAction')
            }
        });
    }, [])

    useEffect(() => {
        setOpen(props?.isOpen)
        setPrimaryAction(props?.primaryAction);
        setSecondaryAction(props?.secondaryAction);
    }, [props])

    return (
        <>
            <Modal isOpen={isOpen} onClose={secondaryAction.cb}>
                <ModalOverlay />
            
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />
                    
                    <ModalBody>
                        {text}
                    </ModalBody>
        
                    <ModalFooter>
                        <Button colorScheme='teal' mr={3} onClick={() => {primaryAction.cb()} }>
                            {primaryAction?.name}
                        </Button>
                        <Button variant='ghost' onClick={secondaryAction.cb}>
                            {secondaryAction?.name}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalDefault