import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

const http: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 3000,
})

const post = (url: string, params?: any, config?: AxiosRequestConfig) => {
  return http.post(url, params, config)
}

const get = (url: string, params?: any, config?: AxiosRequestConfig) => {
  return http.get(url, { params: params, ...config })
}

export { get, post }
