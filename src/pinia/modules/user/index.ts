import { defineStore } from 'pinia'
import { Ref, ref, UnwrapRef } from 'vue'
import { store } from '@/pinia'
import { resetRouter, routes } from '@/router'
import { AxiosResponse } from 'axios'
import { getToken, removeToken, setToken } from '@/utils/auth'
import { userLogin as loginApi, logout as logoutApi, getUserInfo as getInfoApi } from '@/service/index'
import { usePermissionStore } from '../permission'
import { useRouter } from 'vue-router'
const router = useRouter()
const permissionStore = usePermissionStore()

export const useUserStore = defineStore('user', () => {
  const token: Ref<UnwrapRef<String>> = ref<String>(getToken() || '')
  // 登录
  const login = (loginForm: string): Promise<void> => {
    return new Promise<void>((resolve, reject): void => {
      loginApi(loginForm)
        .then((response: AxiosResponse<any>): void => {
          const getToken = response.data.access_token
          token.value = getToken
          setToken(getToken)
          resolve()
        })
        .catch((e) => {
          reject(e)
        })
    })
  }
  // 注销登录
  const logout = (): Promise<void> => {
    return new Promise<void>((resolve, reject): void => {
      logoutApi()
      resetAuth()
      resetRouter()
      resolve()
    })
  }


  // 重置
  const resetAuth = (): void => {
    removeToken()
    token.value = ''
  }
  return {
    token,
    login,
    logout,
  }
})

// 非setup
export const useUserStoreHook = () => {
  return useUserStore(store)
}
