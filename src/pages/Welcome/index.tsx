// import { api } from '../../services/apiAssas'
import { Container } from './styles'

export function Welcome() {
  // const data = {
  //   name: 'Marcelo Almeida',
  //   cpfCnpj: '24971563792',
  // }

  // const data = {
  //   billingType: 'CREDIT_CARD',
  //   creditCard: {
  //     holderName: 'teste',
  //     number: '4444 4444 4444 4444',
  //     expiryMonth: '06',
  //     expiryYear: '2024',
  //     ccv: '123',
  //   },
  //   creditCardHolderInfo: {
  //     name: 'teste',
  //     email: 'teste@teste.com',
  //     cpfCnpj: '12477339630',
  //     postalCode: '30285738',
  //     addressNumber: 'rua luiza mascarenhas',
  //     addressComplement: '177',
  //     phone: '31984621493',
  //     mobilePhone: '31984621493',
  //   },
  //   dueDate: new Date(),
  //   value: 100,
  //   customer: 'cus_000005358052',
  //   authorizeOnly: true,
  //   remoteIp: '138.121.66.87',
  // }

  // api
  //   .post('/customers', data)
  //   .then((body) => console.log(`Deu certo: ${body}`))
  //   .catch((error) => console.log(`Erro ao enviar o post: ${error.message}`))

  // api
  //   .post('/payments', data)
  //   .then((response) => console.log(`Deu certo: ${response.data}`))
  //   .catch((error) => console.log(`Erro ao enviar o post: ${error.message}`))

  return (
    <Container>
      <h1>Sejam Bem-vindos ao nosso casamento!</h1>
      <div>
        <p>
          Criamos esse site para compartilhar alguns detalhes do nosso
          casamento.
        </p>
        <p>
          É importante que vocês confirmem a sua presença. Para isto contamos
          com sua ajuda clicando no menu &quot;Confirme sua Presença&quot; e
          preenchendo os dados necessários. Para nos presentear, escolha
          qualquer item da Lista de Casamento.
        </p>
        <p>Fiquem à vontade! </p>

        <p>Aguardamos vocês no nosso grande dia!</p>
      </div>
    </Container>
  )
}
