import { CaretDoubleUp, ShoppingCart, Trash } from 'phosphor-react'
import {
  BaseButton,
  CancelButton,
  CartIcon,
  ConcludeButton,
  ContainerButtons,
  ContainerCart,
  ContainerElements,
  ContainerListPresents,
  ContainerRemoveAllItens,
  ContainerTitle,
  ContainerTotal,
  FooterCart,
  NotificationCount,
} from './styles'
import { useState } from 'react'
import { useCart } from '../../contexts/contexts'
import isValidProp from '@emotion/is-prop-valid'
import { StyleSheetManager } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { PaymentModal } from '../PaymentModal'
export function Cart() {
  const [isExpanded, setIsExpanded] = useState(true)
  const { removeItemCart, removeAllItemsCart, totalPrice, totalItens } =
    useCart()
  const navigation = useNavigate()
  const { state } = useCart()
  const [isModalOpen, setIsModalOpen] = useState(true)
  const handleCheckout = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

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
            <CaretDoubleUp
              className={
                isExpanded ? 'rotate-clockwise' : 'rotate-counterclockwise'
              }
            />
            <p>Meu carrinho</p>
            <ShoppingCart size={22} />
            <CartIcon>
              {totalItens > 0 && (
                <NotificationCount>{totalItens}</NotificationCount>
              )}
            </CartIcon>
          </ContainerTitle>{' '}
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
            {totalItens > 0 && (
              <CancelButton onClick={() => handleRemoveAllItemsCart()}>
                Remover todos os itens
              </CancelButton>
            )}
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
            <ConcludeButton
              onClick={() => {
                setIsExpanded((state) => !state)
                handleCheckout()
              }}
            >
              Concluir compra
            </ConcludeButton>
            <PaymentModal isOpen={isModalOpen} onClose={handleCloseModal} />

            <BaseButton
              onClick={() => {
                navigation('/listPresents', { state: true })
                setIsExpanded((state) => !state)
              }}
            >
              Adicionar Itens
            </BaseButton>
          </ContainerButtons>
        </FooterCart>
      </ContainerCart>
    </StyleSheetManager>
  )
}
