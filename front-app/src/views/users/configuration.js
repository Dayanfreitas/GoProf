import { FormAdminControl } from "../../context/access";
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
    Box,
    Checkbox, 
    CheckboxGroup,
    FormControl,
    FormLabel,
    Input,
    Heading,
    RadioGroup,
    Stack,
    Flex,
    Radio,
    Button,
    ButtonGroup,
    Center,
    Avatar
} from '@chakra-ui/react';

import { Categories } from '../components'
import AuthActions from '../../actions/Auth'

const FormConfiguration = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsErro] = useState(false);
    
    const [fullName, setFullName] = useState('')
    const [email, setEmail]       = useState('')
    const [phone, setPhone]       = useState('')
    const [sexo, setSexo]         = useState('M')
    const [isAdmin, setIsAdmin]   = useState(false)
    const [nickName, setNickName] = useState('')
    const [categorie, setCategorie] = useState('');
    const [position, setPosition] = useState("1")
    
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [image, setImage] = useState({})
    const handleShowClick = () => setShowPassword(!showPassword);

    const sendUpdateUser = async () => {
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
        const response = await authActions.update({ id, user });
        setIsLoading(false);

        if(response.status == 200) {
            finish();
        }
        
        if(response.status == 400)
            responseRegistrationFailed(response);
    }
    
    const finish = () => {
        reloadFieldsForms();
        loadCurrentUserById(id);
    }

    const loadCurrentUserById = async () => {
        const authActions = AuthActions();
        const userResponse = await authActions.getUserById({id});
        const { data, status } = userResponse
        
        const { user, err, type } = data

        if (type === 'error' && status === 404)
            navigate('/not-found')

        if (type === 'error' && status === 403)
            navigate('/forbbiden')

      
        setFullName(user?.name)
        setEmail(user?.email)
        setPhone(user?.phone)
        setSexo(user?.genero)
        setIsAdmin(user?.permission)
        setNickName(user?.nick_name)
        setCategorie(user?.categorie_id)
        setPosition(`${user?.position_id}`)
        setImage({image_preview: user?.url_image})
    }
    
    const responseRegistrationFailed = ({data}) => {
        console.log('Tosts de erro', data)
    }

    const handleImagePreview = async (e) => {
        let image_as_base64 = URL.createObjectURL(e.target.files[0])
        let image_as_files = e.target.files[0];

        setImage({
            image_preview: image_as_base64,
            image_file: image_as_files,
        })

        setTimeout(async () => {
            if (image_as_files !== null) {
                const authActions = AuthActions();
                let formData = new FormData();
                formData.append('avatar', image_as_files);
                const responseImage = await authActions.saveImage(formData)
    
                if (responseImage && responseImage.status == 200) {
                    setImage({
                        image_preview: responseImage.data.url || '',
                        image_file: image_as_files,
                    })
                }
            }
        }, 200)
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
        setImage({})
    }

    useEffect(() => {
        loadCurrentUserById();        
    }, [id])

    return (
        <Box p={4}>
            <Box>
                <Center>
                    <Heading>
                        {fullName} - {nickName}
                    </Heading>
                </Center>
            </Box>

            <Flex
                direction={["column"]}
                >
                <Center>
                   <Avatar
                        boxSize='150px'
                        src={image.image_preview || ''}
                    />
                   </Center>
                <Center>
                    <input type="file" onChange={handleImagePreview} value=""/>
                </Center>

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
                
                <FormAdminControl>                                        
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
                </FormAdminControl>
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

                    
                    <FormAdminControl>
                        <FormControl isRequired >
                            <FormLabel htmlFor='categorie'>Categoria:</FormLabel>
                            <Categories value={categorie} setCategorie={setCategorie}/>
                        </FormControl>
                    </FormAdminControl>

                    <FormControl isRequired isInvalid={isError}>
                        <FormLabel htmlFor='position'>Posição</FormLabel>
                        <RadioGroup id='position' name='position' onChange={setPosition} value={position}>
                            <Stack direction='row'>
                                <Radio value="1">Direita</Radio>
                                <Radio value="2">Esquerda</Radio>
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
                        onClick={sendUpdateUser}
                        >
                        Salvar
                    </Button>
                </ButtonGroup>
            </Stack>
        </Box>
    )
}
export default FormConfiguration;

