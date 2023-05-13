interface OptionsType {
  value: number
  label: string
}

interface FieldType {
  label?: string
  key?: string
  value?: string
  type?: string
  width?: number
  max?: number
  minRows?: number
  maxRows?: number
  required?: boolean
  options?: Array<OptionsType>
}

export const edit_field_options = (data, role) => {
  return [
    {
      label: '用户名',
      key: 'username',
      value: data.username,
      type: 'text',
      required: true,
    },
    {
      label: '昵称',
      key: 'nickname',
      value: data.nickname,
      type: 'text',
    },
    {
      label: '性别',
      key: 'sex',
      value: data.sex,
      type: 'select',
      required: false,
      options: [
        {
          value: '1',
          label: '男',
        },
        {
          value: '0',
          label: '女',
        },
        {
          value: '-1',
          label: '未知',
        },
      ],
    },
    {
      label: '头像上传',
      key: 'userpic',
      type: 'upload',
      value: data.userpic,
      fileList: [],
    },
    {
      label: '联系方式',
      key: 'cellphone',
      value: data.cellphone,
      type: 'text',
      required: true,
    },
    {
      label: '邮箱',
      key: 'email',
      value: data.email,
      type: 'text',
      required: false,
    },
    {
      label: 'QQ',
      key: 'qq',
      value: data.qq,
      type: 'text',
      required: false,
    },
    {
      label: '角色',
      key: 'roleId',
      value: data.roleId,
      type: 'select',
      required: true,
      options: role.map((item) => ({
        value: item.id,
        label: item.roleName,
      })),
    },
  ] as FieldType[]
}

export const add_field_options = (data) => {
  return [
    {
      label: '用户名',
      key: 'username',
      value: '',
      type: 'text',
      required: true,
    },
    {
      label: '昵称',
      key: 'nickname',
      value: '',
      type: 'text',
    },
    {
      label: '性别',
      key: 'sex',
      value: '-1',
      type: 'select',
      required: false,
      options: [
        {
          value: '1',
          label: '男',
        },
        {
          value: '0',
          label: '女',
        },
        {
          value: '-1',
          label: '未知',
        },
      ],
    },
    {
      label: '联系方式',
      key: 'cellphone',
      value: '',
      type: 'text',
      required: true,
    },
    {
      label: '邮箱',
      key: 'email',
      value: '',
      type: 'text',
      required: false,
    },
    {
      label: 'QQ',
      key: 'qq',
      value: '',
      type: 'text',
      required: false,
    },
    {
      label: '角色',
      key: 'roleId',
      value: undefined,
      type: 'select',
      required: true,
      options: data.map((item) => ({
        value: item.id,
        label: item.roleName,
      })),
    },
  ] as FieldType[]
}
