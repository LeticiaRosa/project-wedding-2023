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
import { ChangeEvent } from 'react'
import { formatCPF, formatPhone } from '../../utils/formatteds'
import { api } from '../../services/apiAssas'

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
  const { register, handleSubmit, control, setValue } = useForm<DataForm>({
    defaultValues: {
      name: '',
      email: '',
      cpf: '',
      phone: '',
      quota: '1',
    },
  })
  const { totalPrice } = useCart()
  if (!isOpen) {
    return null
  }

  async function createClient(data: any) {
    const cpfCnpj = data.cpfCnpj.replace(/[.-]/g, '')
    await api
      .get(`/customers?cpfCnpj=${cpfCnpj}`)
      .then(async (body) => {
        if (body.data.data.length === 0) {
          await api.post('/customers', {
            name: data.name,
            cpfCnpj,
          })
        }
      })
      .catch((error) => console.log(`Erro ao enviar o post: ${error.message}`))
  }

  async function listClient(cpf: string) {
    const cpfCnpj = cpf.replace(/[.-]/g, '')
    try {
      const response = await api
        .get(`/customers?cpfCnpj=${cpfCnpj}`)
        .then((body) => {
          return body.data.data
        })
        .catch((error) =>
          console.log(`Erro ao enviar o post: ${error.message}`),
        )
      return response[0].id
    } catch (error: any) {
      console.log(`Erro ao enviar o GET: ${error.message}`)
      return null // Retorna null em caso de erro
    }
  }

  function createPayment(data: any) {
    console.log(data)
    // api
    //   .post('/payments', data)
    //   .then((response) => console.log(`Deu certo: ${response.data}`))
    //   .catch((error) => console.log(`Erro ao enviar o post: ${error.message}`))
  }

  async function handlePay(data: DataForm) {
    createClient({ name: data.name, cpfCnpj: data.cpf })
    const idCustomer = await listClient(data.cpf)
    createPayment({
      billingType: 'CREDIT_CARD',
      creditCard: {
        holderName: 'teste',
        number: '4444 4444 4444 4444',
        expiryMonth: '06',
        expiryYear: '2024',
        ccv: '123',
      },
      creditCardHolderInfo: {
        name: 'teste',
        email: 'teste@teste.com',
        cpfCnpj: '12477339630',
        postalCode: '30285738',
        addressNumber: 'rua luiza mascarenhas',
        addressComplement: '177',
        phone: '31984621493',
        mobilePhone: '31984621493',
      },
      dueDate: new Date(),
      value: 100,
      customer: `${idCustomer}`,
      authorizeOnly: true,
      remoteIp: '138.121.66.87',
    })
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

  const handleChangeQuota = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    setValue('quota', value)
  }

  const quotas: number[] = [1, 2, 3, 4, 5, 6] // Exemplo de opções de parcelas

  return (
    <StyleSheetManager shouldForwardProp={isValidProp}>
      <ModalOverlay onClick={onClose}>
        <ModalContentWrapper onClick={(e: any) => e.stopPropagation()}>
          <form action="submit" onSubmit={handleSubmit(handlePay)}>
            <ModalHeader>
              <ModalTitle>
                <p>Dados para emissão do {typeModal}</p>
                <span>
                  Campos com asterisco (*) são de preenchimento obrigatório.
                </span>
              </ModalTitle>
              <CloseButton type="button" onClick={onClose}>
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
                  placeholder="Informe seu nome"
                  required
                  {...register('name')}
                />
              </ContainerSeparatorInputs>

              <ContainerSeparatorInputs>
                <label htmlFor="email">E-mail*</label>
                {/* <p>
                  (Você receberá o QR Code e a confirmação de pagamento recebido
                  neste e-mail)
                </p> */}
                <input
                  type="email"
                  id="email"
                  placeholder="Informe seu e-mail"
                  required
                  {...register('email')}
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
                      maxLength={14}
                      placeholder="Informe seu CPF"
                      required
                    />
                  )}
                />
              </ContainerSeparatorInputs>

              <ContainerSeparatorInputs>
                <label htmlFor="telefone">Telefone*</label>
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
                      placeholder="Informe seu Telefone"
                      required
                    />
                  )}
                />
              </ContainerSeparatorInputs>
              <ContainerSeparatorInputs>
                <label htmlFor="quota">Modo de Parcelamento*</label>
                <Controller
                  name="quota"
                  control={control}
                  render={({ field: { value, ref } }) => (
                    <select
                      id="quota"
                      {...register('quota')}
                      value={value}
                      ref={ref}
                      onChange={(e) => handleChangeQuota(e)}
                    >
                      {quotas.map((option) => (
                        <option key={option} value={option}>
                          {`${option} parcela(s) de ${(
                            totalPrice /
                            100 /
                            option
                          ).toLocaleString('pt-br', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                      sem juros`}
                        </option>
                      ))}
                    </select>
                  )}
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
              <CancelButton onClick={onClose} type="button">
                Voltar
              </CancelButton>
              <PaymentButton type="submit">Realizar Pagamento</PaymentButton>
            </ModalFooter>
          </form>
        </ModalContentWrapper>
      </ModalOverlay>
    </StyleSheetManager>
  )
}
