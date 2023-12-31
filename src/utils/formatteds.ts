export const formatCPF = (value: string) => {
  // Remove qualquer caractere não numérico
  const cleanedValue = value.replace(/\D/g, '')

  // Aplica a máscara de CPF
  let formattedValue = cleanedValue
  if (cleanedValue.length > 3) {
    formattedValue = cleanedValue.replace(/^(\d{3})(\d)/, '$1.$2')
  }
  if (cleanedValue.length > 6) {
    formattedValue = formattedValue.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
  }
  if (cleanedValue.length > 9) {
    formattedValue = formattedValue.replace(
      /^(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/,
      '$1.$2.$3-$4',
    )
  }

  return formattedValue
}

export const formatPhone = (value: string) => {
  // Remove qualquer caractere não numérico
  const cleanedValue = value.replace(/\D/g, '')

  // Verifica se há números suficientes para aplicar a máscara
  if (cleanedValue.length >= 10) {
    // Obtém o DDD e o número do telefone
    const ddd = cleanedValue.slice(0, 2)
    const phoneNumber = cleanedValue.slice(2)

    // Aplica a máscara de telefone com DDD
    const formattedValue = `(${ddd}) ${phoneNumber.slice(
      0,
      5,
    )}-${phoneNumber.slice(5)}`
    return formattedValue
  }

  return cleanedValue
}

export const formatCEP = (value: string) => {
  const cepFormattedSpaces = value.replace(/\D/g, '') // Remove caracteres não numéricos
  const cepFormatted = cepFormattedSpaces.replace(/^(\d{5})(\d{3})/, '$1-$2') // Aplica a máscara XXXXX-XXX
  return cepFormatted
}

export const formatCreditCardNumber = (creditCardNumber: string) => {
  // Remove espaços em branco e caracteres não numéricos
  const cleanedNumber = creditCardNumber.replace(/\D/g, '')

  // Define o padrão para a formatação
  const pattern = /(\d{1,4})/g

  // Formata o número aplicando os grupos separados por espaços
  const formattedNumber = cleanedNumber.replace(pattern, '$1 ')

  return formattedNumber.trim() // Remove espaços extras no início ou final
}

export function adicionarDiasUteis(dataAtual: Date, diasUteis: number) {
  const milissegundosPorDia = 24 * 60 * 60 * 1000
  let diasAdicionados = 0

  while (diasAdicionados < diasUteis) {
    dataAtual.setTime(dataAtual.getTime() + milissegundosPorDia)
    const diaDaSemana = dataAtual.getDay()

    // Verificar se é sábado (dia 6) ou domingo (dia 0)
    if (diaDaSemana !== 0 && diaDaSemana !== 6) {
      diasAdicionados++
    }
  }

  return dataAtual
}
