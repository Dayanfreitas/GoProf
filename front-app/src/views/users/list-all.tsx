import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Flex,
  Container,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
} from '@chakra-ui/react'
import { FaUser, FaPen } from 'react-icons/fa'
import { UsersActions } from '../../actions'
import type { User, UsersListProps } from './props/users-list-props'

export const UsersList: React.FC<UsersListProps> = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState<User[]>([])

  const loadUsers = async (): Promise<void> => {
    const usersActions = UsersActions()
    const responseUsers = await usersActions.getAll()
    const { users } = responseUsers.data
    setUsers(users)
  }

  const openProfile = (id: number): void => {
    navigate('/users/' + String(id))
  }

  const openEdit = (id: number): void => {
    navigate('/users/configuration/' + String(id))
  }

  useEffect(() => {
    loadUsers().catch((error) => {
      console.error(error)
    })
  }, [])

  return (
    <Box p={4}>
      <Container maxW="container.xl">
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Lista de usuários</TableCaption>

            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Telefone</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            {users.length > 0 ? (
              <Tbody>
                {users.map(({ id, name, email, phone }) => {
                  return (
                    <Tr key={id}>
                      <Td>{name}</Td>
                      <Td>{email}</Td>
                      <Td>{phone}</Td>
                      <Td>
                        <Box>
                          <Flex>
                            <Button
                              colorScheme="teal"
                              m={1}
                              onClick={() => {
                                openProfile(id)
                              }}
                            >
                              <FaUser />
                            </Button>
                            <Button
                              colorScheme="gray"
                              m={1}
                              onClick={() => {
                                openEdit(id)
                              }}
                            >
                              <FaPen />
                            </Button>
                          </Flex>
                        </Box>
                      </Td>
                    </Tr>
                  )
                })}
              </Tbody>
            ) : (
              <Tr>
                <Td> Items não encontrados</Td>
              </Tr>
            )}
          </Table>
        </TableContainer>
      </Container>
    </Box>
  )
}
