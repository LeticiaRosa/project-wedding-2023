import { Controller, useForm } from 'react-hook-form'
import { useCart } from '../../../../contexts/contexts'
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
  SeparatorInputs,
  TitleForm,
  BoxContainer,
  ContainerTitleForm,
} from './styles'
import { ChangeEvent, useState } from 'react'
import { X } from 'phosphor-react'
import { formatCEP, formatCPF, formatPhone } from '../../../../utils/formatteds'

interface DataForm {
  quota: string
  name: string
  email: string
  cpfCnpj: string
  phone: string
  postalCode: string
  addressNumber: string
  holderName: string
  numberCreditCard: string
  expiryMonth: string
  expiryYear: string
  ccv: string
  priceTotalWithParce: number
}
interface modalProps {
  onCloseStep: () => void
}
export function FormCreditCard({ onCloseStep }: modalProps) {
  const { totalPrice } = useCart()
  const [totalPriceWithParc, setTotalPriceWithParc] = useState(totalPrice / 100)
  const { register, control, setValue } = useForm<DataForm>({
    defaultValues: {
      quota: '1',
      name: '',
      email: '',
      cpfCnpj: '',
      phone: '',
      postalCode: '',
      addressNumber: '',
      holderName: '',
      numberCreditCard: '',
      expiryMonth: '',
      expiryYear: '',
      ccv: '',
      priceTotalWithParce: 0,
    },
  })
  const quotas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] // Exemplo de opções de parcelas
  function calculeValue(option: number) {
    const taxa = totalPrice / 100 + 0.49
    if (option >= 2 && option <= 6) {
      return (taxa * (3.49 / 100) + taxa) / option
    } else if (option >= 7 && option <= 12) {
      return (taxa * (3.99 / 100) + taxa) / option
    } else {
      return totalPrice / 100
    }
  }
  const handleChangeQuota = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    setValue('quota', value)
    const totalPrice = calculeValue(parseInt(value)) * parseInt(value)
    setTotalPriceWithParc(totalPrice)
  }

  function handleClose() {
    onCloseStep()
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const formattedValue = formatCPF(value)
    setValue('cpfCnpj', formattedValue)
  }

  const handleChangePhone = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const formattedValue = formatPhone(value)
    setValue('phone', formattedValue)
  }

  const handleChangeCEP = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const formattedValue = formatCEP(value)
    setValue('postalCode', formattedValue)
  }

  const months = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ]
  const anoAtual = new Date().getFullYear()
  const quantidadeAnos = 10
  const year = [anoAtual]

  for (let i = 1; i <= quantidadeAnos; i++) {
    year.push(anoAtual + i)
  }

  return (
    <ModalOverlay>
      <ModalContentWrapper>
        <form action="submit">
          <ModalHeader>
            <ModalTitle>
              <p>Preencha os dados para realizar o pagamento</p>
              <span>* Todos os campos são obrigatórios</span>
            </ModalTitle>
            <CloseButton type="button">
              <X size={25} />
            </CloseButton>
          </ModalHeader>
          <ModalBody>
            <ContainerTitleForm>
              <TitleForm>Dados do Titular do Cartão</TitleForm>
            </ContainerTitleForm>

            <BoxContainer>
              <ContainerSeparatorInputs>
                <label htmlFor="name">Nome do titular do cartão</label>
                <input
                  type="text"
                  id="name"
                  minLength={2}
                  placeholder="Nome do titular do cartão"
                  required
                  {...register('name')}
                />
              </ContainerSeparatorInputs>
              <ContainerSeparatorInputs>
                <label htmlFor="email">E-mail do titular do cartão</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Informe seu e-mail"
                  required
                  {...register('email')}
                />
              </ContainerSeparatorInputs>
              <SeparatorInputs>
                <ContainerSeparatorInputs>
                  <label htmlFor="cpf">CPF do titular do cartão</label>
                  <Controller
                    name="cpfCnpj"
                    control={control}
                    render={({ field: { value, ref } }) => (
                      <input
                        type="text"
                        id="cpfCnpj"
                        onChange={(e) => handleChange(e)}
                        value={value}
                        ref={ref}
                        maxLength={14}
                        placeholder="XXX.XXX.XXX-XX"
                        required
                      />
                    )}
                  />
                </ContainerSeparatorInputs>
                <ContainerSeparatorInputs>
                  <label htmlFor="telefone">
                    Telefone do titular do cartão
                  </label>
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
                        placeholder="(XX) XXXX-XXXX"
                        required
                      />
                    )}
                  />
                </ContainerSeparatorInputs>
              </SeparatorInputs>
              <ContainerTitleForm>
                <TitleForm>Endereço do Titular do Cartão</TitleForm>
              </ContainerTitleForm>

              <BoxContainer>
                <SeparatorInputs>
                  <ContainerSeparatorInputs>
                    <label htmlFor="postalCode">CEP do titular do cartão</label>
                    <Controller
                      name="postalCode"
                      control={control}
                      render={({ field: { value, ref } }) => (
                        <input
                          type="text"
                          id="postalCode"
                          onChange={(e) => handleChangeCEP(e)}
                          value={value}
                          ref={ref}
                          maxLength={8}
                          placeholder="XXXXX-XX"
                          required
                        />
                      )}
                    />
                  </ContainerSeparatorInputs>
                  <ContainerSeparatorInputs>
                    <label htmlFor="addressNumber">Número da residencia </label>
                    <input
                      type="number"
                      min={0}
                      id="addressNumber"
                      placeholder="Número da residência"
                      required
                      {...register('addressNumber')}
                    />
                  </ContainerSeparatorInputs>
                </SeparatorInputs>
              </BoxContainer>
            </BoxContainer>
            <ContainerTitleForm>
              <TitleForm>Dados do Cartão</TitleForm>
            </ContainerTitleForm>
            <BoxContainer>
              <ContainerSeparatorInputs>
                <label htmlFor="name">Número do cartão</label>

                <Controller
                  name="numberCreditCard"
                  control={control}
                  render={({ field: { value, ref } }) => (
                    <input
                      type="text"
                      id="numberCreditCard"
                      value={value}
                      ref={ref}
                      maxLength={14}
                      placeholder="Número do cartão"
                      required
                    />
                  )}
                />
              </ContainerSeparatorInputs>

              <ContainerSeparatorInputs>
                <label htmlFor="name">Nome impresso no cartão</label>
                <input
                  type="text"
                  id="holderName"
                  minLength={2}
                  placeholder="Nome impresso no cartão"
                  required
                  {...register('holderName')}
                />
              </ContainerSeparatorInputs>
              <SeparatorInputs>
                <ContainerSeparatorInputs>
                  <label htmlFor="expiryMonth">Mês de expiração</label>

                  <select
                    id="expiryMonth"
                    value="01"
                    {...register('expiryMonth')}
                  >
                    {months.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </ContainerSeparatorInputs>
                <ContainerSeparatorInputs>
                  <label htmlFor="expiryYear">Ano de expiração</label>

                  <select
                    id="expiryYear"
                    value="2023"
                    {...register('expiryYear')}
                  >
                    {year.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </ContainerSeparatorInputs>
                <ContainerSeparatorInputs>
                  <label htmlFor="ccv">Código de segurança</label>
                  <input
                    type="number"
                    id="ccv"
                    min={0}
                    placeholder="ccv"
                    required
                    {...register('ccv')}
                  />
                </ContainerSeparatorInputs>
              </SeparatorInputs>
              <ContainerSeparatorInputs>
                <label htmlFor="quota">Modo de Parcelamento</label>
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
                          {`${option} parcela${
                            option > 1 ? `s` : ``
                          } de ${calculeValue(option).toLocaleString('pt-br', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                     ${option === 1 ? `sem` : `com`} juros
                      `}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </ContainerSeparatorInputs>
              <ContainerSeparatorInputs>
                <p>
                  Total parcelado:{' '}
                  {totalPriceWithParc.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </p>
              </ContainerSeparatorInputs>
            </BoxContainer>
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
            <CancelButton type="button" onClick={() => handleClose()}>
              Voltar
            </CancelButton>
            <PaymentButton type="submit">Pagar</PaymentButton>
          </ModalFooter>
        </form>
      </ModalContentWrapper>
    </ModalOverlay>
  )
}
