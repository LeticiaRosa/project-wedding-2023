import { Container } from './styles'
import { List } from './components/List'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ListPresents() {
  const location = useLocation()
  useEffect(() => {
    if (location.state) handleButtonClick()
  }, [location.pathname])
  function handleButtonClick() {
    const element = document.getElementById('title-presents')
    if (element) {
      window.scrollTo({
        top: 410,
        left: 0,
        behavior: 'smooth',
      })
    }
  }
  return (
    <Container>
      <h1 id="title-presents">Lista de Presentes On-Line!</h1>
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
