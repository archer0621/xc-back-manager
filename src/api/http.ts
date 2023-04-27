import { rewriteUrl } from '@/common/http'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

const http: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 3000,
})

const post = (url: string, params?: any, config?: AxiosRequestConfig) => {
  return http.post(rewriteUrl(url), params, config)
}

const get = (url: string, params?: any, config?: AxiosRequestConfig) => {
  return http.get(rewriteUrl(url), { params: params, ...config })
}

export { get, post }
