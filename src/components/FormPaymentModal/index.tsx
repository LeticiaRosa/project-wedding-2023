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
import { Controller, useForm } from 'react-hook-form'
import { ChangeEvent, useState } from 'react'
import { formatCPF, formatPhone } from '../../utils/formatteds'
import { api } from '../../services/apiAssas'
import { FormCreditCard } from './components/FormCreditCard'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { returnError } from '../../utils/response_api'

interface modalProps {
  isOpen: boolean
  onClose: () => void
  typeModal: string
}
interface DataForm {
  name: string
  email: string
  cpf: string
  phone: string
  quota: string
}
export function FormPaymentModal({ isOpen, onClose, typeModal }: modalProps) {
  const [isOpenStep, setIsOpenStep] = useState(false)
  const [clientId, setClientId] = useState('')
  const { register, handleSubmit, control, setValue } = useForm<DataForm>({
    defaultValues: {
      name: '',
      email: '',
      cpf: '',
      phone: '',
    },
  })
  const { totalPrice, totalItens } = useCart()

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

  function handleClose() {
    onClose()
  }

  async function handleGo(data: DataForm) {
    createClient({ name: data.name, cpfCnpj: data.cpf })
    const idCustomer = await listClient(data.cpf)
    setClientId(idCustomer)
    if (idCustomer.length > 0) {
      setIsOpenStep(true)
    }
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
    isOpen &&
    totalItens > 0 && (
      <>
        <ToastContainer />
        <StyleSheetManager shouldForwardProp={isValidProp}>
          <ModalOverlay onClick={() => handleClose()}>
            <ModalContentWrapper onClick={(e: any) => e.stopPropagation()}>
              <form action="submit" onSubmit={handleSubmit(handleGo)}>
                <ModalHeader>
                  <ModalTitle>
                    <p>Preencha os seus dados</p>
                    <span>
                      Campos com asterisco (*) são de preenchimento obrigatório.
                    </span>
                  </ModalTitle>
                  <CloseButton type="button" onClick={() => handleClose()}>
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
                  <CancelButton onClick={() => handleClose()} type="button">
                    Voltar
                  </CancelButton>
                  <PaymentButton type="submit">Avançar</PaymentButton>
                </ModalFooter>
              </form>
            </ModalContentWrapper>
          </ModalOverlay>
          {isOpenStep && typeModal === 'Credito' && (
            <FormCreditCard
              clientId={clientId}
              onCloseStep={() => setIsOpenStep(false)}
            />
          )}
        </StyleSheetManager>
      </>
    )
  )
}
