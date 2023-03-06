import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Heading,
  Flex,
  Text,
  Button,
  Img,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  MenuItem
} from "@chakra-ui/react";

import { 
  HamburgerIcon,
  InfoOutlineIcon,
  StarIcon,
  UnlockIcon,
  ArrowForwardIcon
} from "@chakra-ui/icons";

import { BsFillGearFill } from "react-icons/bs" 
import { FaShoppingBasket } from "react-icons/fa";
import {Alert} from './commons/Alert'

import AuthActions from '../../actions/Auth'
import { useAccess, FormAuthControl, FormNotAuthControl } from "../../context/access";
// import logo from '../../assets/padel_sfs.jpg'

const Header = (props) => {
  const navigate = useNavigate();
  const { currentUser } = useAccess();
  const [isAuth, setIsAuth] = useState(false);

  const [organization, setOrganization] = useState({
    logo: "",
    name: "São Francisco do Sul Padel"
  })  
  const { isOpen, onOpen, onClose } = useDisclosure();

  function openModalConfirmLogout() {
    onOpen()
  }
  
  const navigateToLogin = () => {
    navigate('/login');
  }
  
  const logout = () => {
    const authActions = AuthActions();
    authActions.logout();

    navigate('/');
    window.location.reload();
  }

  const menuItens = [
    {id: 1, name: 'Sobre', path: '/', icon: <InfoOutlineIcon/>},
    {id: 2, name: 'Ranking', path: '/ranking', icon: <StarIcon/>},
  ]

  return (
    <>
      <Alert
        isOpen={isOpen}
        onClose={onClose}
        title={"Fazer logout !"}
        text="Tem certeza que deseja fazer logout!"
        closeText="Cancelar"
        actionText="Fazer logout"
        actionCallback={logout}
      />

      <Flex align="center" m={2} boxShadow='xs'>
        <Logo />
        <Heading as="h1" size="lg" letterSpacing={"tighter"}>
          {organization?.name}
        </Heading>        
      </Flex> 

      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding={2}
        bg="white"
        color="blackAlpha.800"
        borderColor="blackAlpha.500"  
      >
        <Menu Box display={{ base: "none" }}>
          <MenuButton
            px={4}
            py={2}
            transition='all 0.2s'
            borderRadius='md'
            borderWidth='1px'
            _hover={{ bg: 'gray.400' }}
            _expanded={{ bg: 'blue.400' }}
            _focus={{ boxShadow: 'outline' }}
          >
            <HamburgerIcon />
          </MenuButton>
          <MenuList>
            {
              menuItens.map((item) => {
                return (
                  <MenuItem key={item.id}>
                    <Link to={item.path}>
                      {item.icon}{item.name}
                    </Link>
                  </MenuItem>
                )
              })
            }
            <MenuDivider />
            <MenuItem>
              <FormAuthControl>
                <Link to={"/users/configuration/"+currentUser.id}> 
                  <Flex direction="row"> 
                    <BsFillGearFill/> 
                      <Text>
                        { currentUser?.name }
                      </Text>
                  </Flex>
                </Link>
              </FormAuthControl>
            </MenuItem>
            <MenuItem>
              <FormAuthControl>
                <Button onClick={openModalConfirmLogout}>
                  <Text>Logout</Text>
                  <ArrowForwardIcon ml='2'/>
                </Button> 
              </FormAuthControl>
              <FormNotAuthControl>
                <Button onClick={navigateToLogin}>
                  <Text>Login</Text>
                  <UnlockIcon ml='2'/>
                </Button>
              </FormNotAuthControl>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </>
  );
};

const Logo = () => {
  return (
  <> 
    <Img
      boxSize='100px'
      objectFit='cover'
      src={''}
      alt='Logo da empresa'
    />
  </>)
} 

export default Header;
