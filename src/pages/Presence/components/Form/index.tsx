import { FormEvent } from 'react'
import { ContainerForm, ContainerButton, ContainerInputs } from './styles'
import axios from 'axios'

export function Form() {
  const repeticoes = Array.from({ length: 6 }, (_, index) => index)

  async function handleOnSubmit(event: FormEvent) {
    event.preventDefault()
    await axios
      .post(
        'https://sheet.best/api/sheets/8507c123-02eb-43f0-a757-4233f294e081',
        {
          NOME: 'Teste',
          'VAI AO CASAMENTO?': 'Sim',
          TEXTO: 'Teste Teste Apenas Teste',
          'QUANTIDADE DE PESSOAS': '7',
        },
      )
      .then((response) => console.log(response))
      .catch((errror) => console.log(errror))
  }

  return (
    <ContainerForm action="submit">
      <ContainerInputs>
        <p>
          <h4>Formulário de Confirmação de Presença</h4>
        </p>
        <div className="name">
          <label htmlFor="name">
            Informe o seu nome ou da sua familia conforme escrito no convite:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Informe seu nome"
            required
          />
        </div>

        <div>
          <legend>Podemos contar com a sua presença ? </legend>

          <label className="radio">
            <input type="radio" name="IsPresent" value="Yes" required />
            <span className="checkmark"></span>
            Sim, estarei presente no casamento
          </label>

          <label className="radio">
            <input type="radio" name="IsPresent" value="No" />
            <span className="checkmark"></span>
            Não, infelizmente não poderei comparecer
          </label>
        </div>

        <div>
          <label htmlFor="mensage">
            Caso sua resposta a pergunta acima seja NÃO, utilize o campo abaixo
            para enviar uma mensagem aos noivos:
          </label>
          <h6>Assine com seu nome completo no final do texto</h6>
          <textarea
            id="mensage"
            placeholder="Digite aqui a sua mensagem"
          ></textarea>
        </div>

        <div>
          <legend>Selecione a quantidade de confirmados:</legend>

          {repeticoes.map((item) => {
            if (item > 1) {
              return (
                <label className="radio" key={item}>
                  <input type="radio" name="amountPeople" value={item} />
                  <span className="checkmark"></span>
                  {item} pessoas (incluindo eu)
                </label>
              )
            } else if (item === 1) {
              return (
                <label className="radio" key={item}>
                  <input type="radio" name="amountPeople" value={item} />
                  <span className="checkmark"></span>
                  {item} pessoa (somente eu)
                </label>
              )
            }
            return <></>
          })}
        </div>
      </ContainerInputs>
      <ContainerButton>
        <button type="submit" onClick={handleOnSubmit}>
          Confirmar presença
        </button>
      </ContainerButton>
      <p></p>
    </ContainerForm>
  )
}
