import {
  ModalOverlay,
  ModalContentWrapper,
  ModalHeader,
  ModalTitle,
  CloseButton,
} from './styles'
import { X } from 'phosphor-react'

export function FormPix() {
  return (
    <>
      <ModalOverlay>
        <ModalContentWrapper>
          <ModalHeader>
            <ModalTitle>
              <p>Dados do Pix</p>
              <span>
                Escaneie o QRCODE ou copie a chave para realizar o pagamento
              </span>
            </ModalTitle>
            <CloseButton type="button">
              <X size={25} />
            </CloseButton>
          </ModalHeader>
        </ModalContentWrapper>
      </ModalOverlay>
    </>
  )
}
