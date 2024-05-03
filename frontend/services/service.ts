// utils/api.js
import axios from 'axios'
import { AuthApi, Configuration, DefaultApi } from '../packages/types/api'
// Assuming your types and classes are correctly exported

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8080' // Update to match your actual API's baseURL
})

const configuration = new Configuration({
  basePath: 'http://127.0.0.1:8080'
})

// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem('accessToken') // Retrieve access token from local storage
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// })

const fairTalkApi = new AuthApi(configuration, undefined, axiosInstance)

export default fairTalkApi
