import React from 'react'
import { Box, Text, Button, useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { UsersActions } from '../../actions/Users'

export const Terms: React.FC = () => {
  const toast = useToast()
  const navigate = useNavigate()

  const termAccepted = async () => {
    alert('Deseja aceitar os termos de uso?')
    await UsersActions().updateTermsAccepted()

    toast({
      title: 'Termos de uso aceitos com sucesso!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })

    setTimeout(() => {
      navigate('/')
    }, 3000)
  }

  return (
    <Box p={5}>
      <Text as="h2" fontSize="xl" fontWeight="bold" mb={4}>
        TERMOS DE USO
      </Text>
      <Text mb={4}>
        Bem-vindo ao nosso serviço. Leia atentamente estes termos de uso antes
        de acessar ou utilizar nosso serviço.
      </Text>
      <Text as="b">1. DESCRIÇÃO DO SERVIÇO</Text>
      <Text mb={4}>
        Nosso serviço permite que os usuários acessem e usem GOProf é um
        aplicativo de compartilhamento de conteúdo que permite aos usuários
        explorar e interagir com uma variedade de conteúdos interessantes. Ele
        oferece uma plataforma onde os usuários podem acessar um feed
        personalizado de vídeos, imagens e textos de diferentes categorias. O
        aplicativo possui recursos de compartilhamento e denúncia de conteúdo,
        proporcionando uma experiência interativa e colaborativa para os
        usuários.
        <Text mb={4}>Recursos do Aplicativo:</Text>
        <Text mb={4}>
          Feed Personalizado: O aplicativo exibe um feed de conteúdos
          selecionados com base nos interesses e preferências do usuário.
        </Text>
        <Text mb={4}>
          Navegação e Rolagem de Conteúdo: Os usuários podem explorar os
          conteúdos no feed rolando verticalmente e passando para o próximo
          conteúdo.
        </Text>
        <Text mb={4}>
          Compartilhamento de Conteúdo: Um botão de compartilhamento permite que
          os usuários compartilhem o conteúdo em outras plataformas, como redes
          sociais ou mensagens instantâneas.
        </Text>
        <Text mb={4}>
          Denúncia de Conteúdo: Um botão de denúncia permite que os usuários
          denunciem conteúdos inapropriados ou que violem as diretrizes do
          aplicativo.
        </Text>
        <Text mb={4}>
          Autenticação do Google: Os usuários podem se autenticar no aplicativo
          usando suas contas do Google, facilitando o acesso e o gerenciamento
          de suas interações.
        </Text>
      </Text>
      <Text as="b">2. CONDIÇÕES DE USO</Text>
      <Text mb={4}>
        Ao acessar ou utilizar nosso serviço, você concorda em cumprir estes
        termos de uso e quaisquer termos adicionais que possam ser fornecidos
        por nós. Você concorda em usar nosso serviço apenas para fins legais e
        de acordo com todas as leis e regulamentações aplicáveis.
      </Text>
      <Text as="b">3. DIREITOS E RESPONSABILIDADES DO USUÁRIO</Text>
      <Text mb={4}>
        O usuário é responsável por manter a confidencialidade de sua conta e
        senha, e é responsável por todas as atividades realizadas em sua conta.
        O usuário concorda em não usar nosso serviço para qualquer finalidade
        ilegal ou não autorizada. O usuário também concorda em não interferir ou
        prejudicar a segurança do nosso serviço ou a experiência de outros
        usuários.
      </Text>
      <Text as="b">4. DIREITOS E RESPONSABILIDADES DA EMPRESA</Text>
      <Text mb={4}>
        Nós nos reservamos o direito de modificar ou encerrar nosso serviço a
        qualquer momento, sem aviso prévio. Nós também nos reservamos o direito
        de modificar estes termos de uso a qualquer momento. É responsabilidade
        do usuário revisar estes termos regularmente para estar ciente de
        quaisquer mudanças.
      </Text>
      <Text as="b">5. PROPRIEDADE INTELECTUAL</Text>
      <Text mb={4}>
        Nosso serviço e todo o seu conteúdo, recursos e funcionalidades são de
        nossa propriedade exclusiva ou de nossos licenciadores e estão
        protegidos pelas leis de direitos autorais dos []
      </Text>
      <Text as="b">6. LIMITAÇÃO DE RESPONSABILIDADE</Text>
      <Text mb={4}>
        Nós não nos responsabilizamos por quaisquer danos diretos, indiretos,
        incidentais, especiais ou consequenciais decorrentes do uso ou
        incapacidade de uso do nosso serviço.
      </Text>
      <Text as="b">7. ACORDO COMPLETO</Text>
      <Text mb={4}>
        Estes termos de uso e nossa política de privacidade constituem o acordo
        completo entre o usuário e nossa empresa com relação ao uso do nosso
        serviço.
      </Text>
      <Text mb={4}>
        Ao clicar em "Aceitar", você concorda em cumprir estes termos de uso. Se
        você não concorda com estes termos
      </Text>

      <Button float={'right'} onClick={termAccepted}>
        Aceitar
      </Button>
    </Box>
  )
}
