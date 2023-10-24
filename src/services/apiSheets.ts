import axios from 'axios'
import { baseSheetsURL } from '../constants/endpoints'

export const Api = axios.create({
  baseURL: baseSheetsURL,
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    access_token: import.meta.env.VITE_REACT_APP_API_SHEETS_TOKEN_PATH,
  },
})
