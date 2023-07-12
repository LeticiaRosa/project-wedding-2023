import axios from 'axios'
import { baseSheetsURL } from '../constants/endpoints'

export const Api = axios.create({
  baseURL: baseSheetsURL,
})
