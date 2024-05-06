import axios from 'axios'
import {
  AuthApi,
  ChatsApi,
  Configuration,
  UserApi
} from '../packages/types/api'
import { getSession } from 'next-auth/react'
// Assuming your types and classes are correctly exported

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8080' // Update to match your actual API's baseURL
})

const configuration = new Configuration({
  basePath: 'http://127.0.0.1:8080'
})

axiosInstance.interceptors.request.use(async (config) => {
  const session = await getSession()

  if (session && config.headers) {
    config.headers.Authorization = `Bearer ${session.accessToken}`
  }
  return config
})

const fairTalkApi = new ChatsApi(configuration, undefined, axiosInstance)
const authApi = new AuthApi(configuration, undefined, axiosInstance)
const usersApi = new UserApi(configuration, undefined, axiosInstance)

export { fairTalkApi, authApi, usersApi }
