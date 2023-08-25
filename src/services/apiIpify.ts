import axios from 'axios'

import { baseIpify } from '../constants/endpoints'

export const apiIpify = axios.create({
  baseURL: baseIpify,
})
