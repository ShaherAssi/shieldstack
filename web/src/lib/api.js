import axios from 'axios'
import { getToken, clearToken } from './auth.js'

const api = axios.create({
  baseURL: 'http://localhost:8080',
})

api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      clearToken()
    }
    return Promise.reject(error)
  },
)

export async function login({ email, password }) {
  const res = await api.post('/auth/login', { email, password })
  return res.data
}

export async function getUsers() {
  const res = await api.get('/users')
  return res.data
}

export async function createUser({ email, password, roles }) {
  const payload = { email, password }
  if (roles && roles.length > 0) {
    payload.roles = roles
  }
  const res = await api.post('/users', payload)
  return res.data
}

export default api

