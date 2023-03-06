import React, { useState } from 'react';
import { 
    Box,
    Checkbox, 
    CheckboxGroup,
    FormControl,
    FormLabel,
    Input,
    Grid,
    Heading,
    RadioGroup,
    Stack,
    Flex,
    Radio,
    InputGroup,
    InputRightElement,
    Button,
    FormHelperText,
    Text,
    FormErrorMessage,
    ButtonGroup,
    VStack

} from '@chakra-ui/react';

import { FaUserAlt, FaLock, FaRegEyeSlash, FaRegEye, FaGalacticSenate, FaSearch } from "react-icons/fa";
import AuthActions from '../../actions/Auth'


const FormUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsErro] = useState(false);
    
    
    const [fullName, setFullName] = useState('')
    const [email, setEmail]       = useState('')
    const [phone, setPhone]       = useState('')
    const [sexo, setSexo]         = useState('M')
    const [isAdmin, setIsAdmin]   = useState(false)
    const [nickName, setNickName] = useState('')
    const [categorie, setCategorie] = useState(0);
    const [position, setPosition] = useState(1)
    
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handleShowClick = () => setShowPassword(!showPassword);

    const sendCreateUser = async () => {
        const user = {
            name: fullName,
            email,
            phone,
            genre: sexo,
            permission: isAdmin,
            password,
            nick_name: nickName,
            categorie_id: categorie,
            position_id: position
        }

        setIsLoading(true);
        const authActions = AuthActions();
        const response = await authActions.create(user);
        setIsLoading(false);

        if(response.status == 201)
            finish();
        
        if(response.status == 400)
            responseRegistrationFailed(response);
    }
    
    const finish = () => {
        reloadFieldsForms();
    }

    const responseRegistrationFailed = ({data}) => {
        console.log('Tosts de erro', data)
    }

    const reloadFieldsForms = () => {
        setFullName('');
        setEmail('');
        setPhone('');
        setSexo('M');
        setIsAdmin(false);
        setNickName('');
        setCategorie(0);
        setPosition(1);
        setPassword('');
    }

    return (
        <Box p={4}>
            <Box>
                <Heading size='md'>Formulário de Usuário</Heading>
            </Box>

            <Flex
                direction={["column"]}
                >
                <FormControl isRequired isInvalid={isError}>
                    <FormLabel htmlFor='full_name'>Nome completo</FormLabel>
                    <Input
                        id='full_name'
                        name='full_name'
                        type='text'
                        placeholder="Nome completo"
                        value={fullName}
                        onChange={(e) => { setFullName(e.target.value) }}
                    />
                    {/* {!isError ? (
                        <FormHelperText>
                        Enter the email you'd like to receive the newsletter on.
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage>Email is required.</FormErrorMessage>
                    )} */}
                </FormControl>

                <FormControl isInvalid={isError}>
                    <FormLabel htmlFor='password'>Senha</FormLabel>
                    <InputGroup>
                        <Input
                            id='password'
                            type={showPassword ? "text" : "password"}
                            placeholder="Senha"
                            value={password}
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
                    {/* {!isError ? (
                        <FormHelperText>
                            Enter the email you'd like to receive the newsletter on.
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage>Email is required.</FormErrorMessage>
                    )} */}
                </FormControl>

                <FormControl isRequired isInvalid={isError}>
                    <FormLabel htmlFor='email'>Email</FormLabel>
                    <Input
                        id='email'
                        type='email'
                        value={email}
                        placeholder="Email"
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                    {/* {!isError ? (
                        <FormHelperText>
                        Enter the email you'd like to receive the newsletter on.
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage>Email is required.</FormErrorMessage>
                    )} */}
                </FormControl>

                <FormControl isRequired isInvalid={isError}>
                    <FormLabel htmlFor='phone'>Telefone</FormLabel>
                    <Input
                        id='phone'
                        type="tel"
                        value={phone}
                        placeholder="(xx) x xxxx-xxxx"
                        onChange={(e) => { setPhone(e.target.value) }}
                    />
                    {/* {!isError ? (
                        <FormHelperText>
                        Enter the email you'd like to receive the newsletter on.
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage>Email is required.</FormErrorMessage>
                    )} */}
                </FormControl>
                
                <FormControl isRequired isInvalid={isError}>
                    <FormLabel htmlFor='sex'>Gênero</FormLabel>
                    <RadioGroup id='sex' name='sex' onChange={setSexo} value={sexo}>
                        <Stack direction='row'>
                            <Radio value='M'>Masculino</Radio>
                            <Radio value='F'>Feminino</Radio>
                        </Stack>
                    </RadioGroup>
                </FormControl>

                <FormControl>
                    <FormLabel htmlFor='permission'>Permissão:</FormLabel>
                    <CheckboxGroup>
                        <Checkbox 
                            id='permission' 
                            name='permission' 
                            isChecked={isAdmin} 
                            onChange={(e) => { setIsAdmin(e.target.checked) }}
                            >
                                Admin
                            </Checkbox>
                    </CheckboxGroup>
                </FormControl>                
            </Flex>
            
            <Flex direction={["column"]}>
                <Box w="100%" mt={2}>
                    <Heading size='md'>Atleta</Heading>
                </Box>

                <Box display={{md: 'flex'}} gap={2}>
                    <FormControl isRequired isInvalid={isError}>
                        <FormLabel htmlFor='nick_name'>Apelido</FormLabel>
                        <Input
                            id='nick_name'
                            name='nick_name'
                            type='text'
                            placeholder="Apelido"
                            value={nickName}
                            onChange={(e) => { setNickName(e.target.value) }}
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel htmlFor='categorie'>Categoria:</FormLabel>
                    </FormControl>

                    <FormControl isRequired isInvalid={isError}>
                        <FormLabel htmlFor='position'>Posição</FormLabel>
                        <RadioGroup id='position' name='position' onChange={setPosition} value={position}>
                            <Stack direction='row'>
                                <Radio value={1}>Direita</Radio>
                                <Radio value={2}>Esquerda</Radio>
                            </Stack>
                        </RadioGroup>
                    </FormControl>
                </Box>
            </Flex>


            <Stack direction='row' p={2}>
                <ButtonGroup spacing={4}>
                    <Button isLoading={isLoading} 
                        colorScheme='teal' 
                        variant='solid'
                        onClick={sendCreateUser}
                        >
                        Salvar
                    </Button>

                    <Button isLoading={isLoading}
                        loadingText='Submitting'
                        colorScheme='teal'
                        variant='outline'
                        onClick={reloadFieldsForms}>
                        Cancelar
                    </Button>
                </ButtonGroup>
            </Stack>
        </Box>
    )
}
export default FormUser;

