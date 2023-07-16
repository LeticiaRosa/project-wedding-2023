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
} from './styles'
import { ChangeEvent } from 'react'
import { X } from 'phosphor-react'

interface DataForm {
  quota: string
}

export function FormCreditCard() {
  const { totalPrice } = useCart()
  const { register, control, setValue } = useForm<DataForm>({
    defaultValues: {
      quota: '1',
    },
  })
  const handleChangeQuota = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    setValue('quota', value)
  }

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
  return (
    <ModalOverlay>
      <ModalContentWrapper>
        <form action="submit">
          <ModalHeader>
            <ModalTitle>
              <p>Dados para emissão do Cartão</p>
              <span>
                Campos com asterisco (*) são de preenchimento obrigatório.
              </span>
            </ModalTitle>
            <CloseButton type="button">
              <X size={25} />
            </CloseButton>
          </ModalHeader>
          <ModalBody>
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
            <CancelButton type="button">Voltar</CancelButton>
            <PaymentButton type="submit">Pagar</PaymentButton>
          </ModalFooter>
        </form>
      </ModalContentWrapper>
    </ModalOverlay>
  )
}
