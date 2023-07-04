import { Container } from './styles'

export function Events() {
  return (
    <Container>
      <h1>Cerimônia e Recepção</h1>

      <span>
        A cerimônia e a recepção serão realizados no{' '}
        <strong>SÍTIO BOA VISTA IGARAPÉ</strong>, no dia:{' '}
        <strong>25/11/2023 às 17:30</strong>
      </span>
      <p>
        <strong>Endereço:</strong> Rua Salvador Nunes, 84, Bairro Cidade Nova,
        Igarape/MG
      </p>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3747.396157869275!2d-44.29651192509861!3d-20.075719981345692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa6d10e6af8cd29%3A0x7ee967dc212962ce!2sR.%20Salvador%20Nunes%2C%2084%20-%20A%20Definir%2C%20Igarap%C3%A9%20-%20MG%2C%2032900-000!5e0!3m2!1spt-BR!2sbr!4v1688474243905!5m2!1spt-BR!2sbr"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <p>
        <strong>No Waze:</strong> &quot;Sítio Boa Vista Igarapé&quot;
      </p>
    </Container>
  )
}
