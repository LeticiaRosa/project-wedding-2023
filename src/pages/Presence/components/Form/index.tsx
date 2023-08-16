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
  ContainerRadio,
} from './styles'
import { ChangeEvent, useState } from 'react'

import { Controller, useForm } from 'react-hook-form'
import { StyleSheetManager } from 'styled-components'
import isValidProp from '@emotion/is-prop-valid'

import { Api } from '../../../../services/apiSheets'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { GestOption, gestsList } from '../../../../constants/guestsList'
import { format } from 'date-fns'

interface DataForm {
  mensage: string
  optionSelect: { id: number; name: string; gests: number }
  confirmed: {
    name: string
    minor: 'S' | 'N'
  }
}

export function Form() {
  const { register, handleSubmit, reset, control, setValue, getValues } =
    useForm<DataForm>({
      defaultValues: {
        mensage: '',
        optionSelect: {},
        confirmed: {},
      },
    })

  const [searchTerm, setSearchTerm] = useState('')
  const [nameConfirmated, setNameConfirmated] = useState<string[]>([])
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]) // Estado para acompanhar as caixas de seleção selecionadas

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

  const handleInputNamesChange = (
    value: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    setNameConfirmated((prevValues) => {
      const newValues = [...prevValues]
      newValues[index] = value.target.value
      return newValues
    })
  }

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (selectedCheckboxes.includes(value)) {
      setSelectedCheckboxes(selectedCheckboxes.filter((item) => item !== value)) // Desmarcar se já estiver marcado
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, value]) // Marcar se ainda não estiver marcado
    }
  }
  async function handleSalveOnSheets(data: DataForm) {
    const names = nameConfirmated.map((name) => name || ' - ')
    const dataAtual = new Date()
    const dataAtualFormatada = format(dataAtual, 'dd/MM/yyyy HH:mm:ss')
    const dataFormatted = {
      'NOME FAMILIA': data.optionSelect.name,
      'QUANTIDADE DE CONVIDADOS': data.optionSelect.gests,
      'QUANTIDADE DE CONFIRMADOS': nameConfirmated.length,
      'NOME DOS CONFIRMADOS': names,
      'QUANTIDADE DE MENORES DE IDADE': selectedCheckboxes.length,
      TEXTO: data.mensage,
      'DATA DA CONFIRMAÇÃO': dataAtualFormatada,
    }
    console.log(dataFormatted)

    await Api.post('', dataFormatted)
      .then(() =>
        toast.success('Presença Confirmada!', {
          position: toast.POSITION.TOP_CENTER,
          theme: 'colored',
        }),
      )
      .catch((error) =>
        toast.error(`Erro ao enviar o post: ${error.message}`, {
          position: toast.POSITION.TOP_CENTER,
          theme: 'colored',
        }),
      )
    setSearchTerm('')
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
            rules={{
              required: true,
            }}
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
        <ContainerSeparatorInputs>
          <Controller
            name="confirmed"
            control={control}
            render={() => {
              return getValues('optionSelect').id > 0 ? (
                <div>
                  <legend>
                    Gentileza preencher os campos abaixo apenas com o nome dos
                    confirmados:
                  </legend>

                  {Array.from({ length: getValues('optionSelect').gests }).map(
                    (_, index) => (
                      <ContainerRadio key={index}>
                        <input
                          type="text"
                          name={`nameConfirmated[${index}]`}
                          onChange={(e) => {
                            handleInputNamesChange(e, index)
                          }}
                        />
                        <input
                          type="checkbox"
                          value={`Option ${index}`}
                          checked={selectedCheckboxes.includes(
                            `Option ${index}`,
                          )}
                          onChange={handleCheckboxChange}
                        />
                        <span className="checkmark"></span>
                        Menor de 8 anos
                      </ContainerRadio>
                    ),
                  )}
                </div>
              ) : (
                <div></div>
              )
            }}
          />
        </ContainerSeparatorInputs>
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
