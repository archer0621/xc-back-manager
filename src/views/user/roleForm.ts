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

export const edit_field_options = (data) => {
  return [
    {
      label: '角色名',
      key: 'roleName',
      value: data.roleName,
      type: 'text',
      required: true,
    },
    {
      label: '角色编码',
      key: 'roleCode',
      value: data.roleCode,
      type: 'text',
      required: true,
    },
    {
      label: '角色描述',
      key: 'description',
      value: data.description,
      type: 'text',
    },
    {
      label: '角色状态',
      key: 'status',
      value: data.status,
      type: 'select',
      required: true,
      options: [
        {
          value: '1',
          label: '正常',
        },
        {
          value: '0',
          label: '封禁中',
        },
      ],
    },
  ] as FieldType[]
}

export const add_field_options = () => {
  return [
    {
      label: '角色名',
      key: 'roleName',
      value: '',
      type: 'text',
      required: true,
    },
    {
      label: '角色编码',
      key: 'roleCode',
      value: '',
      type: 'text',
      required: true,
    },
    {
      label: '角色描述',
      key: 'description',
      value: '',
      type: 'text',
    },
    {
      label: '角色状态',
      key: 'status',
      value: '1',
      type: 'select',
      required: true,
      options: [
        {
          value: '1',
          label: '正常',
        },
        {
          value: '0',
          label: '封禁中',
        },
      ],
    },
  ] as FieldType[]
}
