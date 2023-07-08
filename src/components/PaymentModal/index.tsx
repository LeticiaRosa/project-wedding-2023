import { StyleSheetManager } from 'styled-components'
import {
  ModalOverlay,
  ModalContentWrapper,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  OptionsButton,
  ContainerTitleButton,
} from './styles'
import isValidProp from '@emotion/is-prop-valid'
import { ReactComponent as Pix } from '../../assets/pix.svg'
import { ReactComponent as Boleto } from '../../assets/boleto.svg'
import { ReactComponent as Cart } from '../../assets/cart.svg'
import { X } from 'phosphor-react'
interface modalProps {
  isOpen: boolean
  onClose: () => void
}

export function PaymentModal({ isOpen, onClose }: modalProps) {
  if (!isOpen) {
    return null
  }

  return (
    <StyleSheetManager shouldForwardProp={isValidProp}>
      <ModalOverlay onClick={onClose}>
        <ModalContentWrapper onClick={(e: any) => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>Selecione como deseja pagar</ModalTitle>
            <CloseButton onClick={onClose}>
              <X size={25} />
            </CloseButton>
          </ModalHeader>
          <ModalBody>
            <OptionsButton>
              <Pix />
              <ContainerTitleButton>
                <p>Pix</p>
                <span>Aprovação imediata</span>
              </ContainerTitleButton>
            </OptionsButton>
            <OptionsButton>
              <Cart />
              <ContainerTitleButton>
                <p>Cartão de Crédito</p>
                <span>Pagamento em até 6x</span>
              </ContainerTitleButton>
            </OptionsButton>
            <OptionsButton>
              <Boleto />
              <ContainerTitleButton>
                <p>Boleto Bancário</p>
                <span>
                  Prazo de 02 (dois) dias úteis para serem confirmados pelo
                  banco.
                </span>
              </ContainerTitleButton>
            </OptionsButton>
          </ModalBody>
          {/* <ModalFooter>
            <CancelButton onClick={onClose}>Cancelar Compra</CancelButton>
            <PaymentButton onClick={handlePayment}>
              Realizar Pagamento
            </PaymentButton>
          </ModalFooter> */}
        </ModalContentWrapper>
      </ModalOverlay>
    </StyleSheetManager>
  )
}
