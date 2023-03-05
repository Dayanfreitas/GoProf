import React from "react";
import {
  Box,
  Stack,
  Heading,
  Flex,
  Text,
  Button,
  Img,
  useDisclosure
} from "@chakra-ui/react";
import { HamburgerIcon, UpDownIcon } from "@chakra-ui/icons";

import { Link } from "react-router-dom";

const Footer = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());

  return (
    <Flex
      className={'footer'}
      as="div"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      bg="blackAlpha.800"
      color="white"
      {...props}
    >
    
      <Flex align="center" mr={5}>
        {/* <Img
            boxSize='50px'
            objectFit='cover'
            src='https://bit.ly/dan-abramov'
            alt='Dan Abramov'
            // boxSize='100px'
        />
        <Text>
          KIO Sports
        </Text> */}


        {/* <Heading as="h1" size="lg" letterSpacing={"tighter"}>
            {props?.organization?.name}
        </Heading>         */}
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <UpDownIcon />
      </Box>

      <Stack
        direction={{ base: "column", md: "row" }}
        display={{ base: isOpen ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
        mt={{ base: 4, md: 0 }}
      >
        <Text>
          <Link to="/">Sobre</Link>
        </Text>

        <Text>
          <Link to="/ranking">Ranking</Link>
        </Text>
        <Text>
          <a target="_blank" href="https://www.instagram.com/dayanfreitass/">
            Desenvolvido por Dayan Freitas
          </a>
        </Text>
      </Stack>

      <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        {/* <Button
          variant="outline"
          _hover={{ bg: "orange.600", borderColor: "orange.600"}}
        >
          Create account
        </Button> */}
      </Box>

    </Flex>
  );
};

export default Footer;
