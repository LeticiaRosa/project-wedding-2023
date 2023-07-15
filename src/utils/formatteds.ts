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
