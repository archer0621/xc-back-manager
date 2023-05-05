// 用户对象
export interface MenuList {
  id: string,
  name: string,
  grade: string,
  parentId: string,
  path: string,
  status: string,
  createDate: Date,
  updateDate: Date,
  description: string,
  managementList: Array<SubMenuList>,
  icon: string
}

export interface SubMenuList {
  id: string,
  name: string,
  grade: string,
  parentId: string,
  path: string,
  status: string,
  createDate: Date,
  updateDate: Date,
  description: string,
  icon: string
}