import { FooterContainer } from './styles'
import Separador from '../../assets/separador.png'

export function Footer() {
  return (
    <>
      <FooterContainer>
        <img src={Separador} className="imageSeparador" />
        <h1>Gabriel e Letícia</h1>
        <h2>25-11-2023</h2>
      </FooterContainer>
    </>
  )
}
