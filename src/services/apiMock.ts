import axios from 'axios'

import { baseMock } from '../constants/endpoints'

export const apiMock = axios.create({
  baseURL: baseMock,
})
