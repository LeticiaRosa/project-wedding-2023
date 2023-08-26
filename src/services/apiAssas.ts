import axios from 'axios'

export const api = axios.create({
  baseURL: '',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    access_token: import.meta.env.VITE_REACT_APP_API_ASSAS_TOKEN_PATH,
  },
})
