import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  useToast
} from "@chakra-ui/react";
import AuthActions from "../../actions/Auth";
import { FaUserAlt, FaLock, FaRegEyeSlash, FaRegEye } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const ViewLogin = () => {
  const navigate = useNavigate();
  
  const toast = useToast();
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  
  const handleShowClick = () => setShowPassword(!showPassword);
    
  const auth = async () => {
    const authActions = AuthActions();
    const user = {
      email,
      password
    }

    const responseAuth = await authActions.auth(user)
    const { data } = responseAuth
    if (data.type === 'error') {
      notification({description: data.message, status: data.type})
    }

    const isAuth = authActions.isAuthenticated();
    
    if (isAuth) {
      navigate('/');
      window.location.reload();
    }
  }

  const notification = ({description='', title='', status='info'}) => {
    toast({
      title,
      description,
      status,
      duration: 9000,
      isClosable: true,
    })
  }

  return ( 
    <Flex
      flexDirection="column"
      width="100wh"
      height="80vh"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Bem vindo</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input 
                    type="email" 
                    placeholder="Email" 
                    onChange={(e) => {setEmail(e.target.value)}}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Senha"
                    onChange={(e) => { setPassword(e.target.value) }}
                  />
                  <InputRightElement width="4.5rem">
                    <Button 
                      h="1.75rem"
                      size="sm"
                      bg="teal"
                      color="white"
                      _hover={{background: 'white', color: 'teal'}}
                      onClick={handleShowClick}>
                      {showPassword ? <FaRegEye/> : <FaRegEyeSlash/> }
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  {/* <Link>Esquece sua senha ?</Link> */}
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                variant="solid"
                colorScheme="teal"
                width="full"
                onClick={auth}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default ViewLogin;
