import { useModel } from '../../../../contexts/contextModal'
import {
  ModalOverlay,
  ModalContentWrapper,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ImageWrapper,
  Image,
  ModalBody,
  ContainerSeparatorInputs,
} from './styles'
import { X } from 'phosphor-react'

export interface PropsDataPix {
  encodedImage: string
  expirationDate: undefined
  payload: string
  success: boolean
}

export function FormPix(dataPix: any) {
  const { handleModalData } = useModel()
  return (
    <>
      <ModalOverlay>
        <ModalContentWrapper>
          <ModalHeader>
            <ModalTitle>
              <p>Dados do Pix</p>
              <span>
                Escaneie e pague o QR Code a seguir para efetuar a compra do seu
                presente
              </span>
            </ModalTitle>
            <CloseButton type="button" onClick={() => handleModalData()}>
              <X size={25} />
            </CloseButton>
          </ModalHeader>
          <ModalBody>
            <span>
              1. Acesse a opção Pix no seu Internet Banking ou app de
              pagamentos;
            </span>
            <span>
              2. Escaneie o Qr Code a seguir ou copie o código de pagamento;
            </span>
            <span>
              3. Assim que recebermos o seu pagamento, você receberá uma
              notificação no e-mail informado.
            </span>

            <ContainerSeparatorInputs>
              <span>Efetue o pagamento até o dia 01/08/2023</span>
              Valor: R$ 414,00
              <ImageWrapper>
                {dataPix.dataPix.encodedImage ? (
                  <Image
                    src={`data:image/jpeg;base64,${dataPix.dataPix.encodedImage}`}
                    alt="Imagem da API"
                  />
                ) : (
                  <p>Carregando...</p>
                )}
              </ImageWrapper>
              <span>
                {' '}
                Se preferir, copie o código abaixo para realizar o pagamento.
                <ContainerSeparatorInputs>
                  <input
                    type="text"
                    id="pix"
                    value={dataPix.dataPix.payload}
                    disabled
                  />
                </ContainerSeparatorInputs>
              </span>
            </ContainerSeparatorInputs>
          </ModalBody>
        </ModalContentWrapper>
      </ModalOverlay>
    </>
  )
}
