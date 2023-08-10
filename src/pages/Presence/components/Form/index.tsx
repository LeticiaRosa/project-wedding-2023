// import { format } from 'date-fns'
import {
  ContainerForm,
  ContainerButton,
  TitleForm,
  ContainerSeparatorInputs,
  PresentButton,
  SelectInput,
  SelectContainer,
  ListItem,
  SelectList,
} from './styles'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheetManager } from 'styled-components'
import isValidProp from '@emotion/is-prop-valid'

// import { Api } from '../../../../services/apiSheets'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { GestOption, gestsList } from '../../../../constants/guestsList'
import { useState } from 'react'
import { InputPresence } from './InputPresence'

interface DataForm {
  amountPeople: string
  isPresent: string
  mensage: string
  optionSelect: { id: number; name: string; gests: number }
}

export function Form() {
  const { register, handleSubmit, reset, control, setValue, getValues } =
    useForm<DataForm>({
      defaultValues: {
        amountPeople: '',
        isPresent: '',
        mensage: '',
        optionSelect: {},
      },
    })

  const [searchTerm, setSearchTerm] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  const filteredOptions = gestsList.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSelect = (option: GestOption) => {
    setSearchTerm(option.name)
    setValue('optionSelect', {
      id: option.id,
      name: option.name,
      gests: option.gests,
    })
    setIsVisible(false)
  }

  const handleInputChange = (value: string) => {
    setSearchTerm(value)
    setIsVisible(value.length > 0)
  }

  async function handleSalveOnSheets(data: DataForm) {
    console.log(data)
    // const dataAtual = new Date()
    // const dataAtualFormatada = format(dataAtual, 'dd/MM/yyyy HH:mm:ss')
    // const dataFormatted = {
    //   NOME: data.optionSelect.name,
    //   'VAI AO CASAMENTO?': data.isPresent,
    //   TEXTO: data.mensage,
    //   'QUANTIDADE DE PESSOAS': data.amountPeople,
    //   'DATA DA CONFIRMAÇÃO': dataAtualFormatada,
    // }

    // await Api.post('', dataFormatted)
    //   .then(() =>
    //     toast.success('Presença Confirmada!', {
    //       position: toast.POSITION.TOP_CENTER,
    //       theme: 'colored',
    //     }),
    //   )
    //   .catch((error) =>
    //     toast.error(`Erro ao enviar o post: ${error.message}`, {
    //       position: toast.POSITION.TOP_CENTER,
    //       theme: 'colored',
    //     }),
    //   )
    reset()
  }

  return (
    <>
      <ToastContainer />

      <ContainerForm
        action="submit"
        onSubmit={handleSubmit(handleSalveOnSheets)}
      >
        <TitleForm>Formulário de Confirmação de Presença</TitleForm>
        <ContainerSeparatorInputs>
          <label htmlFor="name">
            Selecione o seu nome ou da sua familia conforme escrito no convite:
          </label>

          <Controller
            name="optionSelect"
            control={control}
            render={({ field }) => (
              <SelectInput
                {...field}
                type="text"
                value={searchTerm}
                onChange={(e: any) => {
                  field.onChange(e)
                  handleInputChange(e.target.value)
                }}
                placeholder="Digite para buscar"
              />
            )}
          />
          <StyleSheetManager shouldForwardProp={isValidProp}>
            <SelectContainer isVisible={isVisible}>
              <SelectList>
                {filteredOptions.map((option) => (
                  <ListItem
                    key={option.id}
                    onClick={() => handleSelect(option)}
                  >
                    {option.name}
                  </ListItem>
                ))}
              </SelectList>
            </SelectContainer>
          </StyleSheetManager>
        </ContainerSeparatorInputs>

        <div>
          {getValues('optionSelect').id > 0 ? (
            <div>
              <legend>
                Gentileza preencher os campos abaixo apenas com o nome dos
                confirmados
              </legend>
              {Array.from({ length: getValues('optionSelect').gests }).map(
                (_, index) => (
                  <InputPresence key={index} />
                ),
              )}
            </div>
          ) : null}
        </div>
        {/* <ContainerSeparatorInputs>
          <legend>Podemos contar com a sua presença ? </legend>

          <label className="radio">
            <input
              type="radio"
              value="Yes"
              required
              {...register('isPresent')}
            />
            <span className="checkmark"></span>
            Sim, estarei presente no casamento
          </label>

          <label className="radio">
            <input type="radio" value="No" {...register('isPresent')} />
            <span className="checkmark"></span>
            Não, infelizmente não poderei comparecer
          </label>
        </ContainerSeparatorInputs> */}
        <ContainerSeparatorInputs>
          <label htmlFor="mensage">
            Se desejar, utilize o campo abaixo para enviar uma mensagem aos
            noivos:
          </label>
          <h6>Assine com seu nome completo no final do texto</h6>
          <textarea
            id="mensage"
            placeholder="Digite aqui a sua mensagem"
            {...register('mensage')}
          ></textarea>
        </ContainerSeparatorInputs>
        <ContainerButton>
          <PresentButton type="submit">Confirmar presença</PresentButton>
        </ContainerButton>
      </ContainerForm>
    </>
  )
}
