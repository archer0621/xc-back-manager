import request from "@/utils/http/index"
import { removeToken } from "@/utils/auth"
// 测试跨域接口连接
const testGet = (params?: object) => {
  return request({
    url: '/user/hello',
    
  })
}

// 获取登录验证码
const getCheckCode = (params?: object) => {
  return request({
    url: '/checkcode/picture',
    params: params,
    method: 'post'
  })
}

// 登录
const userLogin = (params?: string) => {
  return request({
    url: '/auth/oauth/token?'+params,
    method: 'post'
  })
}

// 注销登录
const logout = () => {
  removeToken()
}

// 获取登录信息
const getUserInfo = () => {
  return request({
    url: '/user/menu/list',
    method: 'get'
  })
}


export {
  testGet,
  getCheckCode,
  userLogin,
  logout,
  getUserInfo
}