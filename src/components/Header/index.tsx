import { HeaderContainer, MenuContainer } from './styles'

import Logo from '../../assets/Leticia e Gabriel.jpg'
import Separador from '../../assets/separador.png'
import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <HeaderContainer>
      <MenuContainer>
        <div>
          <h1>G e L</h1>
          <nav>
            <NavLink to="/" title="Welcome">
              Bem-vindo
            </NavLink>
            <NavLink to="/presence" title="Presence">
              Confirmar presença
            </NavLink>
            <NavLink to="/listPresents" title="ListPresents">
              Lista de presentes
            </NavLink>
            <NavLink to="/events" title="Events">
              Eventos
            </NavLink>
          </nav>
        </div>
      </MenuContainer>

      <img src={Logo} alt="" className="imageBackgroung" />
      <img src={Separador} className="imageSeparador" />
    </HeaderContainer>
  )
}
