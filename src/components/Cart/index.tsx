import { CaretDoubleUp, ShoppingCart, Trash } from 'phosphor-react'
import {
  ContainerButtons,
  ContainerCart,
  ContainerElements,
  ContainerListPresents,
  ContainerRemoveAllItens,
  ContainerTitle,
  ContainerTotal,
  FooterCart,
} from './styles'
import { useState } from 'react'
import { useCart } from '../../contexts/contexts'
import isValidProp from '@emotion/is-prop-valid'
import { StyleSheetManager } from 'styled-components'
import { useNavigate } from 'react-router-dom'

export function Cart() {
  const [isExpanded, setIsExpanded] = useState(true)
  const { removeItemCart, removeAllItemsCart, totalPrice } = useCart()
  const navigation = useNavigate()

  const { state } = useCart()

  function handleDeleteItemCart(id: number) {
    removeItemCart(id)
  }
  function handleRemoveAllItemsCart() {
    removeAllItemsCart()
  }

  return (
    <StyleSheetManager shouldForwardProp={isValidProp}>
      <ContainerCart expandedM={isExpanded}>
        <ContainerElements>
          <ContainerTitle
            onClick={() => setIsExpanded((state) => !state)}
            expandedM={isExpanded}
          >
            <CaretDoubleUp className="icon-rotate" />
            <p>Meu carrinho</p>
            <ShoppingCart size={22} />
          </ContainerTitle>
          {state.length ? (
            <ContainerListPresents>
              {state.map((item) => {
                return (
                  <div className="item" key={item.name}>
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
                    <button
                      key={item.id}
                      className="item-remove"
                      onClick={() => handleDeleteItemCart(item.id)}
                    >
                      <Trash size={17} />
                    </button>
                  </div>
                )
              })}
            </ContainerListPresents>
          ) : (
            <p>Seu carrinho está vazio</p>
          )}
        </ContainerElements>
        <FooterCart>
          <ContainerRemoveAllItens>
            <button
              className="removerItens"
              onClick={() => handleRemoveAllItemsCart()}
            >
              {' '}
              Remover todos os itens
            </button>
          </ContainerRemoveAllItens>
          <ContainerTotal>
            <p>Subtotal:</p>
            <strong>
              {(totalPrice / 100).toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}
            </strong>
          </ContainerTotal>

          <ContainerButtons>
            <button
              className="continuarCompra"
              onClick={() => setIsExpanded((state) => !state)}
            >
              Concluir compra
            </button>

            <button
              className="adicionarItens"
              onClick={() => navigation('/listPresents', { state: true })}
            >
              Adicionar Itens
            </button>
          </ContainerButtons>
        </FooterCart>
      </ContainerCart>
    </StyleSheetManager>
  )
}
