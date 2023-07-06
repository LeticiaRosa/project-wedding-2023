import { CaretDoubleDown, CaretDoubleUp, ShoppingCart } from 'phosphor-react'
import {
  ContainerButtons,
  ContainerCart,
  ContainerElements,
  ContainerListPresents,
  ContainerTitle,
  ContainerTotal,
  FooterCart,
} from './styles'
import { useState } from 'react'
import { useCart } from '../../contexts/contexts'

export function Cart() {
  const [isExpanded, setIsExpanded] = useState(true)
  const { listPresents } = useCart()
  const toggleMenu = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <ContainerCart expandedMenu={isExpanded}>
      <ContainerElements>
        <ContainerTitle onClick={toggleMenu}>
          {isExpanded ? (
            <span>
              <CaretDoubleUp size={20} />
            </span>
          ) : (
            <span>
              <CaretDoubleDown size={20} />
            </span>
          )}
          <p>Meu carrinho</p>
          <ShoppingCart size={22} />
        </ContainerTitle>
        <ContainerListPresents>
          {listPresents.map((item) => {
            return (
              <div className="item" key={item.id}>
                <div className="item-name">
                  <img src={item.image} alt={item.name} />
                  <h4>{item.name}</h4>
                </div>
                <div className="item-price">
                  <p>
                    {(item.price / 100).toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </p>
                </div>
              </div>
            )
          })}
        </ContainerListPresents>
      </ContainerElements>
      <FooterCart>
        <ContainerTotal>
          <p>Total:</p>
          <strong>R$ 1588,00</strong>
        </ContainerTotal>

        <ContainerButtons>
          <button className="continuarCompra"> Continuar compra</button>
          <button className="cancelarCompra"> Cancelar compra</button>
        </ContainerButtons>
      </FooterCart>
    </ContainerCart>
  )
}
