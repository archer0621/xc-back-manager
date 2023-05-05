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

// 柱状图
const getBarInfo = () => {
  return request({
    url: '/finance/moneyMonth',
    method: 'get'
  })
}

// 折线图
const getLineInfo = () => {
  return request({
    url: '/finance/financeMonth',
    method: 'get'
  })
}

// 饼状图
const getPieInfo = () => {
  return request({
    url: '/content/course/categoryWithCount',
    method: 'get'
  })
}

// 日志时间轴
const getTimeLog = () => {
  return request({
    url: '/system/dictionary/log/all',
    method: 'get'
  })
}

// 账单增长率
const getFinanceRatio = () => {
  return request({
    url: '/finance/financeTwoMonth',
    method: 'get'
  })
}

// 媒资文件增长率
const getMediaRatio = () => {
  return request({
    url: '/media/file/compareWithLastYear',
    method: 'get'
  })
}

// 课程增长率
const getCourseRatio = () => {
  return request({
    url: '/content/course/compareWithLastYear',
    method: 'get'
  })
}

// 课程发布量增长率
const getPublishRatio = () => {
  return request({
    url: '/content/publish/compareWithLastYear',
    method: 'get'
  })
}

// 教师人数增长率
const getTeacherRatio = () => {
  return request({
    url: '/content/teacher/compareWithLastYear',
    method: 'get'
  })
}

// 订单年增长率
const getOrderRatio = () => {
  return request({
    url: '/orders/compareWithLastYear',
    method: 'get'
  })
}

export {
  testGet,
  getCheckCode,
  userLogin,
  logout,
  getUserInfo,
  getBarInfo,
  getLineInfo,
  getPieInfo,
  getTimeLog,
  getFinanceRatio,
  getMediaRatio,
  getCourseRatio,
  getPublishRatio,
  getTeacherRatio,
  getOrderRatio
}