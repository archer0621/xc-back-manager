import { get, post } from "@/api/http"

// 测试跨域接口连接
const testGet = (params?: object) => {
  return get('/user/hello', params)
}

// 获取登录验证码
const getCheckCode = (parmas?: object) => {
  return post('/checkcode/pic', parmas)
}

// 登录
const userLogin = (params?: string) => {
  return post('/auth/oauth/token?'+params, {})
}


export {
  testGet,
  getCheckCode,
  userLogin
}