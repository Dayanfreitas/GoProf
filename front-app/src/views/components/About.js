import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  UnorderedList,
  ListItem,
  AccordionPanel,
  AccordionItem,
  Accordion,
  AccordionButton,
  AccordionIcon,
  Link,
  AspectRatio,
} from "@chakra-ui/react";
import { PhoneIcon, ExternalLinkIcon } from "@chakra-ui/icons";

const About = (props) => {
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [slogan, setSlogan] = useState('')
  
  //UnorderedList
  const [itens, setItens] = useState('')

  //Contatos
  const [telephone, setTelephone] = useState('')
  const [cellphone, setCellphone] = useState('')

  function setupResume() {
    setTitle('São Francisco do Sul Padel')
    setSubTitle('Sports & recreation')
    setSlogan('𝙋𝙧𝙞𝙢𝙚𝙞𝙧𝙤 𝘾𝙡𝙪𝙗𝙚 𝙙𝙚 𝙋𝙖𝙙𝙚𝙡 𝙙𝙚 𝙎𝙖̃𝙤 𝙁𝙧𝙖𝙣𝙘𝙞𝙨𝙘𝙤 𝙙𝙤 𝙎𝙪𝙡')
  }

  function setupUnorderedList() {
    setItens('Quadras Profissionais, Espaço Kids')
  }

  function setupIframeMaps(){
    return(
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.338013339423!2d-48.635251484968954!3d-26.250690983417066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94d94e841c3f3f4f%3A0xb914af4d14ded9d5!2sR.%20Tedesco%2C%2022%20-%20S%C3%A3o%20Jos%C3%A9%20do%20Acara%C3%AD%2C%20S%C3%A3o%20Francisco%20do%20Sul%20-%20SC%2C%2089240-000!5e0!3m2!1spt-BR!2sbr!4v1645668466383!5m2!1spt-BR!2sbr"></iframe>
    )
  }

  function setupContato() {
    const phone = '(99) 9 9999-9999'
    setTelephone(phone)
    setCellphone(phone)
  }

  useEffect(()=>{
    setupResume()
    setupUnorderedList()
    setupContato()
  }, [])

  function Itens(){
    const list = itens.split(',')
    return(
      list.map((item, i) => {
        return(
          <ListItem key={i}>{item}</ListItem>
        )
      })
    )
    
  }

  return (
    <VStack>
      <Container maxW='container.lg'>
        <Heading>Sobre</Heading>
        <Box p={2}>
          <Heading size='md'>{title}</Heading>
          <Text as="span" size='sm'>{subTitle}</Text>
          <Text>{slogan}</Text>
        </Box>

        <Box m={5} p={2}>
          <UnorderedList>
            <Itens/>
          </UnorderedList>
        </Box>

        <Accordion allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  Professores
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>

            <AccordionPanel pb={4}>
              <Link href='https://www.instagram.com/diogoyoneoka/' isExternal>
                @diogoyoneoka <ExternalLinkIcon mx='2px' />
              </Link>  
            </AccordionPanel>
          </AccordionItem>
         
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  Localização
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <AspectRatio ratio={5 / 5}>
                {setupIframeMaps()}
              </AspectRatio>
            </AccordionPanel>
          </AccordionItem>     
   
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  Contato
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <Box>
                <PhoneIcon/> {telephone}
              </Box>
              <Box>
                <PhoneIcon/> {cellphone}
              </Box>
            
            </AccordionPanel>
          </AccordionItem>     
   
        </Accordion>
      </Container>
    </VStack>
  );
};

export default About;
