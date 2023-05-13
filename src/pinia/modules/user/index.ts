import { defineStore } from 'pinia'
import { Ref, ref, UnwrapRef } from 'vue'
import { store } from '@/pinia'
import { resetRouter } from '@/router'
import { AxiosResponse } from 'axios'
import { getToken, removeToken, setToken } from '@/utils/auth'
import { userLogin as loginApi, logout as logoutApi, getUserInfo as getInfoApi } from '@/service/index'
import { UserInfo } from '@/api/system/user/type'
import { MenuList } from '@/api/system/menu/type'
export const useUserStore = defineStore('user', () => {
  const token: Ref<UnwrapRef<String>> = ref<String>(getToken() || '')
  const roles: Ref<Object> = ref<Object>({})
  const menus: Ref<Array<MenuList>> = ref([]) 
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

  // 获取登录信息
  const getInfo = (): Promise<UserInfo> => {
    return new Promise<UserInfo>((resolve, reject): void => {
      getInfoApi().then(({ data }): void => {
        console.log(data.data);
        const asyncMenus: Array<MenuList> = [...data.data.menuDtoList]
        menus.value = asyncMenus
        roles.value = data.data.xcUserDto
        resolve(data)
      }).catch((error): void => {
        reject(error)
      })
    })
  }

  // 重置
  const resetAuth = (): void => {
    removeToken()
    token.value = ''
    roles.value = {}
  }
  return {
    token,
    roles,
    menus,
    login,
    logout,
    getInfo
  }
})

// 非setup
export const useUserStoreHook = () => {
  return useUserStore(store)
}
