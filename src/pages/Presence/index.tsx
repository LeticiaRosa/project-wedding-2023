import { Form } from './components/Form'
import { Container } from './styles'

export function Presence() {
  return (
    <Container>
      <h1>Confirmar a presença </h1>

      <span>
        Queridos convidados,
        <strong>
          {' '}
          o convite enviado por nós é específico para você e acompanhantes
          descritos no convite!
        </strong>{' '}
        Infelizmente não conseguimos convidar todas as pessoas queridas que
        gostaríamos, por isso pedimos que não o estenda para outras pessoas.
        Você é muito especial para nós, e contamos com a sua presença, mas caso
        não seja possível comparecer, pedimos que nos informe.
        <p>
          Estamos muito felizes em contar com a sua presença em nossa festa!
        </p>
        <strong>
          Por favor, preencha o formulário abaixo com os dados solicitados.
        </strong>
      </span>
      <Form />
    </Container>
  )
}
