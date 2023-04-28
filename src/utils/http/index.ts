import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { getToken, removeToken } from '@/utils/auth'
import { message } from 'ant-design-vue'
import { useUserStoreHook } from '@/pinia/modules/user'
import { config } from 'process'
let reLoginFlag: boolean = true

const service: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 80000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 添加请求拦截器
service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const userStore = useUserStoreHook()
  if (userStore.token) {
    config.headers.Authorization = 'Bearer ' + getToken()
  }
  // 在发送请求之前做些什么
  return config
}, (error) => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use((response: any) => {
  const binaryTypes: string[] = [
    'application/octet-stream',
    'application/zip'
  ]
  if (binaryTypes.includes(response.headers['content-type']) || response.data instanceof ArrayBuffer) {
    return response
  }
  
  const { status, data } = response
  
  if (status === 200) {
    return response
  }
  if (status === 401) {
    if (reLoginFlag) {
      reLoginFlag = false
      message.error('登陆已失效,请重新登录')
      removeToken()
      location.href = '/'
    }
    return Promise.reject(status)
  }
  return Promise.reject(new Error(status))
}, (error: any) => {
  message.warning('未知错误!')
  return Promise.reject(error)
})

export default service