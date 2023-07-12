import { format } from 'date-fns'
import {
  ContainerForm,
  ContainerButton,
  TitleForm,
  ContainerSeparatorInputs,
  PresentButton,
} from './styles'
import { useForm } from 'react-hook-form'
import { Api } from '../../../../services/apiSheets'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface DataForm {
  amountPeople: string
  isPresent: string
  mensage: string
  name: string
}

export function Form() {
  const { register, handleSubmit, reset } = useForm<DataForm>({
    defaultValues: {
      amountPeople: '',
      isPresent: '',
      mensage: '',
      name: '',
    },
  })
  const repeticoes = Array.from({ length: 8 }, (_, index) => index + 1)

  async function handleSalveOnSheets(data: DataForm) {
    const dataAtual = new Date()
    const dataAtualFormatada = format(dataAtual, 'dd/MM/yyyy HH:mm:ss')
    const dataFormatted = {
      NOME: data.name,
      'VAI AO CASAMENTO?': data.isPresent,
      TEXTO: data.mensage,
      'QUANTIDADE DE PESSOAS': data.amountPeople,
      'DATA DA CONFIRMAÇÃO': dataAtualFormatada,
    }

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
            Informe o seu nome ou da sua familia conforme escrito no convite:
          </label>
          <input
            type="text"
            id="name"
            placeholder="Informe seu nome"
            required
            {...register('name')}
          />
        </ContainerSeparatorInputs>

        <ContainerSeparatorInputs>
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
        </ContainerSeparatorInputs>

        <ContainerSeparatorInputs>
          <label htmlFor="mensage">
            Caso sua resposta a pergunta acima seja NÃO, utilize o campo abaixo
            para enviar uma mensagem aos noivos:
          </label>
          <h6>Assine com seu nome completo no final do texto</h6>
          <textarea
            id="mensage"
            placeholder="Digite aqui a sua mensagem"
            {...register('mensage')}
          ></textarea>
        </ContainerSeparatorInputs>

        <ContainerSeparatorInputs>
          <legend>Selecione a quantidade de confirmados:</legend>

          {repeticoes.map((item) => {
            if (item > 1) {
              return (
                <label className="radio" key={item}>
                  <input
                    type="radio"
                    value={item}
                    {...register('amountPeople')}
                  />
                  <span className="checkmark"></span>
                  {item} pessoas (incluindo eu)
                </label>
              )
            } else if (item === 1) {
              return (
                <label className="radio" key={item}>
                  <input
                    type="radio"
                    value={item}
                    {...register('amountPeople')}
                  />
                  <span className="checkmark"></span>
                  {item} pessoa (somente eu)
                </label>
              )
            }
            return <></>
          })}
        </ContainerSeparatorInputs>

        <ContainerButton>
          <PresentButton type="submit">Confirmar presença</PresentButton>
        </ContainerButton>
      </ContainerForm>
    </>
  )
}
