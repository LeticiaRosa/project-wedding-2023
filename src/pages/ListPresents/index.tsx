import { List } from './components/list'
import { Container } from './styles'

export function ListPresents() {
  return (
    <Container>
      <h1>Lista de Presentes On-Line!</h1>
      <span>
        Queridos convidados,
        <strong>
          {' '}
          para nos presentear, escolha qualquer item da Lista de Casamento.
        </strong>{' '}
        Em seguida, você deve clicar no botão de &quot;Concluir a compra&quot; e
        fazer o pagamento!
        <p>
          Desde já agradeçemos pelos presentes e principalmente pelo carinho!
        </p>
      </span>
      <List />
    </Container>
  )
}
