import { StyleSheetManager } from 'styled-components'
import {
  ModalOverlay,
  ModalContentWrapper,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  ContainerSeparatorInputs,
  ModalFooter,
  CancelButton,
  PaymentButton,
  DivPrice,
} from './styles'
import isValidProp from '@emotion/is-prop-valid'

import { X } from 'phosphor-react'
import { useCart } from '../../contexts/contexts'
interface modalProps {
  isOpen: boolean
  onClose: () => void
  typeModal: string
}

export function FormPaymentModal({ isOpen, onClose, typeModal }: modalProps) {
  const { totalPrice } = useCart()
  if (!isOpen) {
    return null
  }

  return (
    <StyleSheetManager shouldForwardProp={isValidProp}>
      <ModalOverlay onClick={onClose}>
        <ModalContentWrapper onClick={(e: any) => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>
              <p>Dados para emissão do {typeModal}</p>
              <span>
                Os campos marcados com asterisco (*) são de preenchimento
                obrigatório.
              </span>
            </ModalTitle>
            <CloseButton onClick={onClose}>
              <X size={25} />
            </CloseButton>
          </ModalHeader>
          <ModalBody>
            <ContainerSeparatorInputs>
              <label htmlFor="name">Nome completo*</label>
              <input
                type="text"
                id="name"
                placeholder="Informe seu nome"
                required
              />
            </ContainerSeparatorInputs>

            <ContainerSeparatorInputs>
              <label htmlFor="email">E-mail*</label>
              <p>
                (Você receberá o QR Code e a confirmação de pagamento recebido
                neste e-mail)
              </p>
              <input
                type="email"
                id="email"
                placeholder="Informe seu e-mail"
                required
              />
            </ContainerSeparatorInputs>

            <ContainerSeparatorInputs>
              <label htmlFor="cpf">CPF*</label>
              <input
                type="text"
                id="cpf"
                placeholder="Informe seu CPF"
                required
              />
            </ContainerSeparatorInputs>

            <ContainerSeparatorInputs>
              <label htmlFor="telefone">Telefone*</label>
              <input
                type="text"
                id="telefone"
                placeholder="Informe seu Telefone"
                required
              />
            </ContainerSeparatorInputs>
          </ModalBody>

          <DivPrice>
            <p>Valor Total: </p>
            <h4>
              {(totalPrice / 100).toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}
            </h4>
          </DivPrice>

          <ModalFooter>
            <CancelButton onClick={onClose}>Voltar</CancelButton>
            <PaymentButton>Realizar Pagamento</PaymentButton>
          </ModalFooter>
        </ModalContentWrapper>
      </ModalOverlay>
    </StyleSheetManager>
  )
}
