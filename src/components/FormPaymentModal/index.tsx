import { StyleSheetManager } from 'styled-components'
// import { saveAs } from 'file-saver'

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
import { Controller, useForm } from 'react-hook-form'
import { ChangeEvent, useState } from 'react'
import {
  adicionarDiasUteis,
  formatCPF,
  formatPhone,
} from '../../utils/formatteds'
import { api } from '../../services/apiAssas'
import { FormCreditCard } from './components/FormCreditCard/index'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { returnError } from '../../utils/responseApi'
import { FormPix, PropsDataPix } from './components/FormPix'
import { useModel } from '../../contexts/contextModal'

interface DataForm {
  name: string
  email: string
  cpf: string
  phone: string
  quota: string
}
export function FormPaymentModal() {
  const { totalPrice, removeAllItemsCart } = useCart()
  const {
    handleModalPayment,
    handleModalData,
    closeAllModals,
    modalType,
    modalData,
    modalPayment,
  } = useModel()
  const [clientId, setClientId] = useState('')
  const [dataPix, setDataPix] = useState<PropsDataPix>()
  const { register, handleSubmit, control, setValue } = useForm<DataForm>({
    defaultValues: {
      name: '',
      email: '',
      cpf: '',
      phone: '',
    },
  })

  async function createClient(data: any) {
    const idCustomer = await listClient(data.cpfCnpj)
    if (idCustomer.length === 0) {
      const cpfCnpj = data.cpfCnpj.replace(/[.-]/g, '')
      await api
        .post('/customers', {
          name: data.name,
          cpfCnpj,
        })
        .catch((error) => returnError(error))
    }
  }

  async function listClient(cpf: string) {
    const cpfCnpj = cpf.replace(/[.-]/g, '')
    try {
      const response = await api
        .get(`/customers?cpfCnpj=${cpfCnpj}`)
        .then((body) => {
          return body.data.data
        })
      if (response.length > 0) {
        return response[0].id
      }
      return []
    } catch (error: any) {
      returnError(error)
      return []
    }
  }

  async function createBoleto(data: any) {
    try {
      const response = await api.post('/payments', data).then((response) => {
        toast.success('Boleto Criado! Verifique seus downloads.', {
          position: toast.POSITION.TOP_CENTER,
          theme: 'colored',
          onClose: () => {
            removeAllItemsCart()
            closeAllModals()
          },
        })
        return response.data.bankSlipUrl
      })

      return response
    } catch (error: any) {
      returnError(error)
      return null
    }
  }

  async function createPayPix(data: any) {
    try {
      const response = await api.post('/payments', data).then((response) => {
        return response.data
      })

      return response
    } catch (error: any) {
      returnError(error)
      return null
    }
  }

  async function qrCodePix(id: string) {
    try {
      const response = await api
        .get(`/payments/${id}/pixQrCode`)
        .then((response) => {
          return response.data
        })

      return response
    } catch (error: any) {
      returnError(error)
      return null
    }
  }

  async function listKeys() {
    try {
      const response = await api
        .get(`/addressKeys?status=ACTIVE`)
        .then((body) => {
          return body.data.data
        })
      if (response.length > 0) {
        return response[0].id
      }
      return []
    } catch (error: any) {
      returnError(error)
      return []
    }
  }

  async function createKey() {
    try {
      const response = await api
        .post('/addressKeys', { type: 'EVP' })
        .then((response) => {
          return response.data.id
        })
      return response
    } catch (error: any) {
      returnError(error)
      return null
    }
  }

  async function openOptions(idCustomer: string) {
    if (idCustomer.length > 0 && modalType === 'Credito') {
      handleModalPayment()
    }
    if (idCustomer.length > 0 && modalType === 'Boleto') {
      const dataAtual = new Date()
      const urlBoleto = await createBoleto({
        billingType: 'BOLETO',
        customer: idCustomer,
        value: totalPrice / 100,
        dueDate: adicionarDiasUteis(dataAtual, 3),
      })
      if (urlBoleto) {
        window.open(urlBoleto, '_blank')
      }
    }
    if (idCustomer.length > 0 && modalType === 'Pix') {
      let keyData = await listKeys()
      if (keyData.length <= 0) {
        const key = await createKey()
        keyData = key
      }
      const dataAtual = new Date()
      const id = await createPayPix({
        billingType: 'PIX',
        customer: idCustomer,
        value: totalPrice / 100,
        dueDate: adicionarDiasUteis(dataAtual, 3),
      })
      const qrcode = await qrCodePix(id.id)
      if (qrcode) {
        setDataPix(qrcode)
        handleModalPayment()
        removeAllItemsCart()
        closeAllModals()
      }
    }
  }

  async function handleGo(data: DataForm) {
    createClient({ name: data.name, cpfCnpj: data.cpf })
    const idCustomer = await listClient(data.cpf)
    setClientId(idCustomer)
    openOptions(idCustomer)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const formattedValue = formatCPF(value)
    setValue('cpf', formattedValue)
  }

  const handleChangePhone = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const formattedValue = formatPhone(value)
    setValue('phone', formattedValue)
  }

  return (
    modalData && (
      <>
        <ToastContainer />
        <StyleSheetManager shouldForwardProp={isValidProp}>
          <ModalOverlay onClick={() => handleModalData()}>
            <ModalContentWrapper onClick={(e: any) => e.stopPropagation()}>
              <form action="submit" onSubmit={handleSubmit(handleGo)}>
                <ModalHeader>
                  <ModalTitle>
                    <p>Preencha os seus dados</p>
                    <span>
                      Campos com asterisco (*) são de preenchimento obrigatório.
                    </span>
                  </ModalTitle>
                  <CloseButton type="button" onClick={() => handleModalData()}>
                    <X size={25} />
                  </CloseButton>
                </ModalHeader>
                <ModalBody>
                  <ContainerSeparatorInputs>
                    <label htmlFor="name">Nome completo*</label>
                    <input
                      type="text"
                      id="name"
                      minLength={2}
                      maxLength={50}
                      placeholder="Informe seu nome"
                      required
                      {...register('name')}
                    />
                  </ContainerSeparatorInputs>
                  <ContainerSeparatorInputs>
                    <label htmlFor="cpf">CPF*</label>
                    <Controller
                      name="cpf"
                      control={control}
                      render={({ field: { value, ref } }) => (
                        <input
                          type="text"
                          id="cpf"
                          onChange={(e) => handleChange(e)}
                          value={value}
                          ref={ref}
                          minLength={14}
                          maxLength={14}
                          placeholder="XXX.XXX.XXX-XX"
                          required
                        />
                      )}
                    />
                  </ContainerSeparatorInputs>
                  <ContainerSeparatorInputs>
                    <label htmlFor="email">E-mail</label>
                    {/* <p>
                  (Você receberá o QR Code e a confirmação de pagamento recebido
                  neste e-mail)
                </p> */}
                    <input
                      type="email"
                      id="email"
                      minLength={2}
                      maxLength={50}
                      placeholder="exemplo@gmail.com"
                      {...register('email')}
                    />
                  </ContainerSeparatorInputs>

                  <ContainerSeparatorInputs>
                    <label htmlFor="telefone">Telefone</label>
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field: { value, ref } }) => (
                        <input
                          type="text"
                          id="phone"
                          onChange={(e) => handleChangePhone(e)}
                          value={value}
                          ref={ref}
                          maxLength={15}
                          minLength={15}
                          placeholder="(XX) XXXXX-XXXX"
                        />
                      )}
                    />
                  </ContainerSeparatorInputs>
                </ModalBody>

                <DivPrice>
                  <p>Subtotal: </p>
                  <h4>
                    {(totalPrice / 100).toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </h4>
                </DivPrice>

                <ModalFooter>
                  <CancelButton onClick={() => handleModalData()} type="button">
                    Voltar
                  </CancelButton>
                  <PaymentButton type="submit">Avançar</PaymentButton>
                </ModalFooter>
              </form>
            </ModalContentWrapper>
          </ModalOverlay>
          {modalPayment && modalType === 'Credito' && (
            <FormCreditCard clientId={clientId} />
          )}
          {modalPayment && modalType === 'Pix' && <FormPix dataPix={dataPix} />}
        </StyleSheetManager>
      </>
    )
  )
}
