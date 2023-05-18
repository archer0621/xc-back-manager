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
      label: '审核状态',
      key: 'auditStatus',
      value: data.auditStatus,
      type: 'select',
      required: true,
      options: [
        {
          value: '002001',
          label: '审核未通过',
        },
        {
          value: '002002',
          label: '未审核',
        },
        {
          value: '002003',
          label: '审核通过',
        },
      ],
    },
    {
      label: '审核意见',
      key: 'auditMind',
      value: data.auditMind,
      type: 'textarea',
    },
  ] as FieldType[]
}