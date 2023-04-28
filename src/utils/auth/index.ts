import Cookies from 'js-cookie'

const tokenKey: string = 'jwt'

export const getToken = (): string | undefined => {
  return Cookies.get(tokenKey)
}

export const setToken = (token: string): void => {
  Cookies.set(tokenKey, token)
}

export const removeToken = (): void => {
  return Cookies.remove(tokenKey)
}