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
import {
  formatCEP,
  formatCPF,
  formatCreditCardNumber,
  formatPhone,
} from '../../../../utils/formatteds'
import { api } from '../../../../services/apiAssas'
import { ToastContainer, toast } from 'react-toastify'
import { returnError } from '../../../../utils/response_api'
import { useModel } from '../../../../contexts/contextModal'
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
  clientId: string
}

export function FormCreditCard({ clientId }: modalProps) {
  const { totalPrice, removeAllItemsCart } = useCart()
  const { handleModalPayment, closeAllModals } = useModel()
  const [totalPriceWithParc, setTotalPriceWithParc] = useState(totalPrice / 100)
  const { register, control, setValue, handleSubmit } = useForm<DataForm>({
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
      expiryMonth: '01',
      expiryYear: '2023',
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
    const totalPrice = calculeValue(Number(value)) * Number(value)
    setTotalPriceWithParc(totalPrice)
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

  const handleChangeNumberCreditCard = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value
    const formattedValue = formatCreditCardNumber(value)
    setValue('numberCreditCard', formattedValue)
  }

  const months = []
  for (let i = 0; i <= 11; i++) {
    const month = (i + 1).toString().padStart(2, '0')
    months.push(month)
  }

  const anoAtual = new Date().getFullYear()
  const quantidadeAnos = 10
  const year = [anoAtual]

  for (let i = 1; i <= quantidadeAnos; i++) {
    year.push(anoAtual + i)
  }

  async function createPayment(data: any) {
    await api
      .post('/payments', data)
      .then(() => {
        toast.success('Pagamento realizado com sucesso', {
          position: toast.POSITION.TOP_CENTER,
          theme: 'colored',
          onClose: () => {
            removeAllItemsCart()
            closeAllModals()
          },
        })
      })
      .catch((error) => returnError(error))
  }

  function handlePay(data: DataForm) {
    const dataFormatted = {
      billingType: 'CREDIT_CARD',
      creditCard: {
        holderName: data.holderName,
        number: data.numberCreditCard,
        expiryMonth: data.expiryMonth,
        expiryYear: data.expiryYear,
        ccv: data.ccv,
      },
      creditCardHolderInfo: {
        name: data.name,
        email: data.email,
        cpfCnpj: data.cpfCnpj.replace(/[.-]/g, ''),
        postalCode: data.postalCode.replace(/\D/g, ''),
        addressNumber: data.addressNumber,
        phone: data.phone.replace(/\D/g, ''),
      },
      dueDate: new Date(),
      installmentCount: Number(data.quota),
      installmentValue: parseFloat(
        (totalPriceWithParc / Number(data.quota)).toFixed(2),
      ),
      value: parseFloat(totalPriceWithParc.toFixed(2)),
      customer: clientId,
      authorizeOnly: true,
      remoteIp: '138.121.66.87',
    }
    createPayment(dataFormatted)
  }

  return (
    <>
      <ToastContainer />

      <ModalOverlay>
        <ModalContentWrapper>
          <form action="submit" onSubmit={handleSubmit(handlePay)}>
            <ModalHeader>
              <ModalTitle>
                <p>Preencha os dados para realizar o pagamento</p>
                <span>* Todos os campos são obrigatórios</span>
              </ModalTitle>
              <CloseButton type="button" onClick={() => handleModalPayment()}>
                <X size={25} />
              </CloseButton>
            </ModalHeader>
            <ModalBody>
              <ContainerTitleForm>
                <TitleForm>Dados do Titular do Cartão</TitleForm>
              </ContainerTitleForm>

              <BoxContainer>
                <ContainerSeparatorInputs>
                  <label htmlFor="name">Nome do titular</label>
                  <input
                    type="text"
                    id="name"
                    minLength={2}
                    maxLength={50}
                    placeholder="Nome do titular do cartão"
                    required
                    {...register('name')}
                  />
                </ContainerSeparatorInputs>
                <ContainerSeparatorInputs>
                  <label htmlFor="email">E-mail do titular</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Informe seu e-mail"
                    required
                    minLength={2}
                    maxLength={50}
                    {...register('email')}
                  />
                </ContainerSeparatorInputs>
                <SeparatorInputs>
                  <ContainerSeparatorInputs>
                    <label htmlFor="cpf">CPF do titular</label>
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
                          minLength={14}
                          maxLength={14}
                          placeholder="XXX.XXX.XXX-XX"
                          required
                        />
                      )}
                    />
                  </ContainerSeparatorInputs>
                  <ContainerSeparatorInputs>
                    <label htmlFor="telefone">Telefone do titular</label>
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
                          placeholder="(XX) XXXX-XXXX"
                          required
                        />
                      )}
                    />
                  </ContainerSeparatorInputs>
                </SeparatorInputs>
                <ContainerTitleForm>
                  <TitleForm>Endereço do Titular</TitleForm>
                </ContainerTitleForm>

                <BoxContainer>
                  <SeparatorInputs>
                    <ContainerSeparatorInputs>
                      <label htmlFor="postalCode">CEP do titular</label>
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
                            minLength={8}
                            maxLength={8}
                            placeholder="XXXXX-XX"
                            required
                          />
                        )}
                      />
                    </ContainerSeparatorInputs>
                  </SeparatorInputs>

                  <ContainerSeparatorInputs>
                    <label htmlFor="postalCode">Rua</label>
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
                          minLength={8}
                          maxLength={8}
                          placeholder="Informe a rua"
                          required
                        />
                      )}
                    />
                  </ContainerSeparatorInputs>

                  <SeparatorInputs>
                    <ContainerSeparatorInputs>
                      <label htmlFor="addressNumber">Número</label>
                      <input
                        type="number"
                        minLength={1}
                        maxLength={6}
                        id="addressNumber"
                        placeholder="Número"
                        required
                        {...register('addressNumber')}
                      />
                    </ContainerSeparatorInputs>
                    <ContainerSeparatorInputs>
                      <label htmlFor="addressNumber">Bairro</label>
                      <input
                        type="number"
                        minLength={1}
                        maxLength={6}
                        id="addressNumber"
                        placeholder="Bairro"
                        required
                        {...register('addressNumber')}
                      />
                    </ContainerSeparatorInputs>
                  </SeparatorInputs>

                  <ContainerSeparatorInputs>
                    <label htmlFor="addressNumber">Complemento</label>
                    <input
                      type="number"
                      minLength={1}
                      maxLength={6}
                      id="addressNumber"
                      placeholder="Complemento"
                      required
                      {...register('addressNumber')}
                    />
                  </ContainerSeparatorInputs>
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
                        onChange={(e) => handleChangeNumberCreditCard(e)}
                        value={value}
                        ref={ref}
                        minLength={19}
                        maxLength={23}
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
                    maxLength={50}
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
                      required
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
                      required
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
                      minLength={3}
                      maxLength={4}
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
                        required
                        ref={ref}
                        onChange={(e) => handleChangeQuota(e)}
                      >
                        {quotas.map((option) => (
                          <option key={option} value={option}>
                            {`${option} parcela${
                              option > 1 ? `s` : ``
                            } de ${calculeValue(option).toLocaleString(
                              'pt-br',
                              {
                                style: 'currency',
                                currency: 'BRL',
                              },
                            )}
                     ${option === 1 ? `sem` : `com`} juros
                      `}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </ContainerSeparatorInputs>
              </BoxContainer>
            </ModalBody>

            <DivPrice>
              <p>
                Subtotal:{' '}
                {(totalPrice / 100).toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </p>
              <h4>
                {'Total: '}
                {totalPriceWithParc.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </h4>
            </DivPrice>

            <ModalFooter>
              <CancelButton type="button" onClick={() => handleModalPayment()}>
                Voltar
              </CancelButton>
              <PaymentButton type="submit">Realizar o pagamento</PaymentButton>
            </ModalFooter>
          </form>
        </ModalContentWrapper>
      </ModalOverlay>
    </>
  )
}
