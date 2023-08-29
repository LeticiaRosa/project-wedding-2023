import { useRef, useState } from 'react'
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
  CopyButton,
  ContainerSeparatorInputCopy,
  ContainerTitle,
  ModalFooter,
  CancelButton,
  ContainerInfo,
  DivPrice,
} from './styles'
import { X } from 'phosphor-react'
import { ReactComponent as Pix } from '../../../../assets/pix.svg'
import { useCart } from '../../../../contexts/contexts'

export interface PropsDataPix {
  encodedImage: string
  expirationDate: undefined
  payload: string
  success: boolean
}

export function FormPix(dataPix: any) {
  const inputRef = useRef<HTMLInputElement | null>(null) // Adicionando o tipo correto
  const [isCopied, setIsCopied] = useState(false)
  const { handleModalPayment } = useModel()
  const { totalPrice } = useCart()
  const handleCopyClick = () => {
    if (inputRef.current) {
      inputRef.current.select()
      navigator.clipboard.writeText(inputRef.current.value)
      setIsCopied(true)
    }
  }
  const dataAtual = new Date().toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      <ModalOverlay>
        <ModalContentWrapper>
          <ModalHeader>
            <ModalTitle>
              <ContainerTitle>
                <Pix />
                <p>Dados do Pix</p>
              </ContainerTitle>
            </ModalTitle>
            <CloseButton
              type="button"
              onClick={() => {
                handleModalPayment()
              }}
            >
              <X size={25} />
            </CloseButton>
          </ModalHeader>

          <ModalBody>
            <p>
              Escaneie e pague o QR Code a seguir para efetuar a compra do seu
              presente
            </p>
            <span>
              <strong>1.</strong> Acesse a opção Pix no seu Internet Banking ou
              app de pagamentos;
            </span>
            <span>
              <strong>2.</strong> Escaneie o Qr Code a seguir ou copie o código
              de pagamento;
            </span>
            <span>
              <strong>3.</strong> Assim que recebermos o seu pagamento, você
              receberá uma notificação no e-mail informado.
            </span>

            <ImageWrapper>
              {dataPix.dataPix.encodedImage ? (
                <Image
                  src={`data:image/jpeg;base64,${dataPix.dataPix.encodedImage}`}
                  alt="Imagem da API"
                />
              ) : (
                <p>Carregando...</p>
              )}
              <ContainerInfo>
                Efetue o pagamento até <span>{dataAtual}</span>
                <DivPrice>
                  <p>Valor: </p>
                  <h4>
                    {(totalPrice / 100).toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </h4>
                </DivPrice>
              </ContainerInfo>
            </ImageWrapper>
            <span>
              Se preferir, copie o código abaixo para realizar o pagamento.
            </span>
            <ContainerSeparatorInputCopy>
              <input
                type="text"
                id="pix"
                value={dataPix.dataPix.payload}
                disabled
                ref={inputRef}
              />

              <CopyButton onClick={handleCopyClick}>
                {isCopied ? 'Copiado! ' : 'Copiar '}
              </CopyButton>
            </ContainerSeparatorInputCopy>
          </ModalBody>
          <ModalFooter>
            <CancelButton type="button" onClick={() => handleModalPayment()}>
              Voltar
            </CancelButton>
          </ModalFooter>
        </ModalContentWrapper>
      </ModalOverlay>
    </>
  )
}
