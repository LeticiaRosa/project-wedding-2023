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
import { FormPaymentModal } from '../FormPaymentModal'
import { optionsPayment, useModel } from '../../contexts/contextModal'

export function OptionsPaymentModal() {
  const { handleModalOptions, handleModalData, handleModalType, modalOptions } =
    useModel()

  function openFormPaymentModal(option: optionsPayment) {
    handleModalType(option)
    handleModalData()
  }

  return (
    modalOptions && (
      <StyleSheetManager shouldForwardProp={isValidProp}>
        <ModalOverlay onClick={() => handleModalOptions()}>
          <ModalContentWrapper onClick={(e: any) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Selecione como deseja pagar</ModalTitle>
              <CloseButton onClick={() => handleModalOptions()}>
                <X size={25} />
              </CloseButton>
            </ModalHeader>
            <ModalBody>
              <OptionsButton onClick={() => openFormPaymentModal('Pix')}>
                <Pix />
                <ContainerTitleButton>
                  <p>Pix</p>
                  <span>Aprovação imediata</span>
                </ContainerTitleButton>
              </OptionsButton>
              <OptionsButton onClick={() => openFormPaymentModal('Credito')}>
                <Cart />
                <ContainerTitleButton>
                  <p>Cartão de Crédito</p>
                  <span>Pagamento em até 12x</span>
                </ContainerTitleButton>
              </OptionsButton>
              <OptionsButton onClick={() => openFormPaymentModal('Boleto')}>
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
          </ModalContentWrapper>
        </ModalOverlay>

        <FormPaymentModal />
      </StyleSheetManager>
    )
  )
}
