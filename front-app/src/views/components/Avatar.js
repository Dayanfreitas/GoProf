import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import {
	Avatar, 
	Badge, 
	Flex, 
	Text,
	Box,
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { FormAdminControl, FormNotAdminControl } from '../../context/access'

function AvatarComponent(props) {  
  const [user, setUser] = useState({});

  const maleOrFemale = (user) => {
    const type = (user?.genero && user?.genero == 'M') ? 
      {
        name: 'Masculino',
        color: 'blue' 
      }
      : (user?.genero && user?.genero == 'F') ?
      {
        name: 'Feminino',
        color: 'yellow' 
      }
      :""
   
    return type || {}
  }

	useEffect(() => {
		setUser(props?.user)
	}, []);

  return (
    <Flex key={user?.id+'_avatar'}>
      <Box>
        <Avatar src={user?.url_image}/>
      </Box>
      <Box ml='3'>
        <Flex>
          <FormAdminControl>
            <Link to={'/users/configuration/'+user.user_id}>
              <Text display="flex" fontWeight='bold'>
                {user?.name}
                <ExternalLinkIcon/>    
              </Text>
            </Link>
          </FormAdminControl>

          <FormNotAdminControl>
            <Text display="flex" fontWeight='bold'>
              {user?.name}
            </Text>
          </FormNotAdminControl>
        </Flex>
        <Badge ml='1' colorScheme={(user?.color)}>
          {(user?.description)} - {(user?.type)}
        </Badge>
        <Badge ml='1' colorScheme={'orange'}>
          <Text fontSize='ml'>Score: {user?.score || ''}  </Text>
        </Badge>
        <Badge ml='1' colorScheme={maleOrFemale(user)?.color}>
          <Text fontSize='ml'>{maleOrFemale(user)?.name}</Text>
        </Badge>
        <Text fontSize='sm'>{user?.position?.description}</Text>   
      </Box>
    </Flex>   
  );
}

export default AvatarComponent;
