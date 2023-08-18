import axios from 'axios'

import { baseCEPURL } from '../constants/endpoints'

export const apii = axios.create({
  baseURL: baseCEPURL,
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
  },
})
