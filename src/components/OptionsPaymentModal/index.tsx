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
import { useState } from 'react'
import { useCart } from '../../contexts/contexts'
interface modalProps {
  isOptionsPaymentModalOpen: boolean
  onOptionsPaymentModalClose: () => void
}

export function OptionsPaymentModal({
  isOptionsPaymentModalOpen,
  onOptionsPaymentModalClose,
}: modalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [typeModal, setTypeModal] = useState('')
  const { totalItens } = useCart()

  const handleCloseModal = () => {
    onOptionsPaymentModalClose()
  }

  const handleCloseModalForm = () => {
    setIsModalOpen(false)
  }

  function openFormPaymentModal(option: string) {
    if (totalItens > 0) {
      setIsModalOpen(true)
      setTypeModal(option)
    } else {
      setIsModalOpen(false)
    }
  }
  if (!isOptionsPaymentModalOpen) {
    return null
  }

  return (
    totalItens > 0 && (
      <StyleSheetManager shouldForwardProp={isValidProp}>
        <ModalOverlay onClick={onOptionsPaymentModalClose}>
          <ModalContentWrapper onClick={(e: any) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Selecione como deseja pagar</ModalTitle>
              <CloseButton onClick={handleCloseModal}>
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
                  <span>Pagamento em até 6x</span>
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

        <FormPaymentModal
          isOpen={isModalOpen}
          onClose={handleCloseModalForm}
          typeModal={typeModal}
        />
      </StyleSheetManager>
    )
  )
}
