import { toast } from 'react-toastify'

interface erros {
  response: {
    data: {
      errors: [
        {
          code: string
          description: string
        },
      ]
    }
  }
  message: string
}

export function returnError(error: erros) {
  if (error.response.data.errors && error.response.data.errors.length > 0) {
    error.response.data.errors.forEach((e: any) => {
      toast.error(e.description, {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored',
      })
    })
  } else {
    toast.error(`Erro Genérico: ${error.message}`, {
      position: toast.POSITION.TOP_CENTER,
      theme: 'colored',
    })
  }
}
