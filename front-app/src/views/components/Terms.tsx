import React from 'react'
import { Box, Text, Button } from '@chakra-ui/react'

export const Terms: React.FC = () => {
  const termAccepted = () => {
    alert('termAccepted!!')
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
        Nosso serviço permite que os usuários acessem e usem [descreva aqui o
        seu serviço ou produto].
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
