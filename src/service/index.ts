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

// 获取用户列表
const getUserList = (params = null, pageNo = 1, pageSize = 5) => {
  return request({
    url: `/user/list?pageNo=${pageNo}&&pageSize=${pageSize}`,
    method: 'post',
    params: params
  })
}

// 获取角色列表
const get_role = (params = null, pageNo = 1, pageSize = 5) => {
  return request({
    url: `/user/role/list?pageNo=${pageNo}&&pageSize=${pageSize}`,
    method: 'post',
    params: params
  })
}

// 获取菜单树
const api_role_tree = (role_id = null) => {
  let url = role_id === null ? `/user/permissionList` : `/user/permissionList?roleId=${role_id}`
  return request({
    url: url,
    method: 'get'
  })
}

// 修改角色权限
const api_edit_role = (role_id, params) => {
  return request({
    url: `/user/grantPermissions?roleId=${role_id}`,
    method: 'post',
    data: params
  })
}

// 获取下拉框角色信息
const api_select_role = () => {
  return request({
    url: `/user/role/getRoleNameList`,
    method: 'get',
  })
}

// 添加角色信息
const api_add_user = (params) => {
  return request({
    url: `/user/register`,
    method: 'post',
    data: params
  })
}

// 根据ID获取用户信息
const api_get_user = (userId) => {
  return request({
    url: `/user/findUserById?userId=${userId}`,
    method: 'get'
  })
} 

// 修改用户信息
const api_edit_user = (params) => {
  return request({
    url: `/user/updateUser`,
    method: 'post',
    data: params
  })
}

// 删除用户信息
const api_del_user = (userId) => {
  return request({
    url: `/user/deleteUserById?userId=${userId}`,
    method: 'delete'
  })
}

// 根据ID获取角色信息
const api_get_role = (roleId) => {
  return request({
    url: `/user/findRoleById?roleId=${roleId}`,
    method: 'get'
  })
}

// 添加角色信息
const api_add_role = (params) => {
  return request({
    url: `/user/roleCreate`,
    method: 'post',
    data: params
  })
}

// 修改角色信息
const api_update_role = (params) => {
  return request({
    url: `/user/roleUpdate`,
    method: 'post',
    data: params
  })
}

// 删除角色信息
const api_del_role = (roleId) => {
  return request({
    url: `/user/roleDeleteById?roleId=${roleId}`,
    method: 'delete'
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
  getOrderRatio,
  getUserList,
  get_role,
  api_role_tree,
  api_edit_role,
  api_select_role,
  api_add_user,
  api_get_user,
  api_edit_user,
  api_del_user,
  api_add_role,
  api_get_role,
  api_update_role,
  api_del_role
}