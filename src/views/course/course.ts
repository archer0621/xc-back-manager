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
      label: '课程名称',
      key: 'name',
      value: data.name,
      type: 'text',
      required: true,
    },
    {
      label: '适用群体',
      key: 'users',
      value: data.users,
      type: 'text',
      required: true,
    },
    {
      label: '标签',
      key: 'tags',
      value: data.tags,
      type: 'text',
      required: true,
    },
    {
      label: '课程类别',
      key: 'category',
      value: [data.mt, data.st],
      type: 'cascader',
      required: true,
    },
    {
      label: '等级',
      key: 'grade',
      value: data.grade,
      type: 'select',
      required: true,
      options: [
        {
          value: '204001',
          label: '初级',
        },
        {
          value: '204002',
          label: '中级',
        },
        {
          value: '204003',
          label: '高级',
        },
      ],
    },
    {
      label: '教学模式',
      key: 'teachmode',
      value: data.teachmode,
      type: 'select',
      required: true,
      options: [
        {
          value: '200002',
          label: '录播',
        },
        {
          value: '200003',
          label: '直播',
        },
      ],
    },
    {
      label: '课程描述',
      key: 'description',
      value: data.description,
      type: 'textarea'
    },
    {
      label: '课程封面上传',
      key: 'pic',
      value: data.pic,
      type: 'upload'
    },
    {
      label: '收费规则',
      key: 'charge',
      value: data.charge,
      type: 'select',
      required: true,
      options: [
        {
          value: '201000',
          label: '免费',
        },
        {
          value: '201001',
          label: '收费',
        },
      ],
    },
    {
      label: '原价',
      key: 'price',
      value: data.price,
      required: true,
      type: 'text'
      
    },
    {
      label: '现价',
      key: 'originalPrice',
      value: data.originalPrice,
      required: true,
      type: 'text'
    },
    {
      label: 'QQ',
      key: 'qq',
      value: data.qq,
      type: 'text'
    },
    {
      label: '微信',
      key: 'wechat',
      value: data.wechat,
      type: 'text'
    },
    {
      label: '联系方式',
      key: 'phone',
      value: data.phone,
      required: true,
      type: 'text'
    },
    {
      label: '有限期（天）',
      key: 'validDays',
      value: data.validDays,
      required: true,
      type: 'text'
    },
  ] as FieldType[]
}