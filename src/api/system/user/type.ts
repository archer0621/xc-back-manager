// 用户对象
export interface SysUser {
  username: string
  nickname: string
  email: string
  qq: string
  cellphone: string
  birthday: Date
  userpic: string
}


export interface UserInfo {
  user: SysUser
  roles?: string[]
  permissions?: string[]
}
