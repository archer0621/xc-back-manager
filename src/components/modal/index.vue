<style scoped lang="less">
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
<template>
  <a-modal v-model:visible="state.visible" :title="state.title">
    <div class="dy-form">
      <a-form ref="formRef" :label-col="labelCol" :wrapper-col="wrapperCol" :model="state.form">
        <div v-for="field in state.fieldItemOptions">
          <a-form-item :label="field.label" :name="field.key" :rules="[{ required: field.required, message: `${field.label}为必填项` }]">
            <template v-if="field.type === 'text'">
              <a-input v-model:value="state.form[`${field.key}`]" />
            </template>
            <template v-else-if="field.type === 'textarea'">
              <a-textarea
                :placeholder="`请输入${field.label}`"
                :auto-size="{
                  minRows: field.minRows || 5,
                  maxRows: field.maxRows || 8,
                }"
                :maxLength="field.max || 256"
                v-model:value="state.form[`${field.key}`]"
              />
            </template>
            <template v-else-if="field.type === 'select'">
              <a-select :placeholder="`请选择${field.label}`" v-model:value="state.form[`${field.key}`]">
                <a-select-option v-for="option in field.options" :key="option.value" :value="option.value">
                  {{ option.label }}
                </a-select-option>
              </a-select>
            </template>
            <template v-else-if="field.type === 'upload'">
              <a-upload v-model:file-list="field.fileList" name="filedata" :headers="{ Authorization: state.token }" list-type="picture-card" class="avatar-uploader" :show-upload-list="false" :action="state.uploadUrl" :before-upload="methods.beforeUpload" @change="methods.handleChange">
                <img v-if="state.form[`${field.key}`]" :src="state.form[`${field.key}`]" width="100" height="100" alt="avatar" />
                <div v-else>
                  <loading-outlined v-if="state.loading"></loading-outlined>
                  <plus-outlined v-else></plus-outlined>
                  <div class="ant-upload-text">Upload</div>
                </div>
              </a-upload>
            </template>
            <template v-else-if="field.type === 'cascader'">
              <a-cascader v-model:value="state.form[`${field.key}`]" :options="state.options" placeholder="请选择"/>
            </template>
            <template v-else-if="field.type === 'checkbox'">
              <a-checkbox-group>
                <a-checkbox v-for="option in field.options" :key="option.value" :value="option.value" :style="{ width: field.width }">
                  {{ option.label }}
                </a-checkbox>
              </a-checkbox-group>
            </template>
            <template v-else-if="field.type === 'radio'">
              <a-radio-group>
                <a-radio v-for="option in field.options" :key="option.value" :value="option.value">
                  {{ option.label }}
                </a-radio>
              </a-radio-group>
            </template>
          </a-form-item>
        </div>
      </a-form>
    </div>
    <template #footer>
      <a-button key="back" @click="methods.handleCancel">取消</a-button>
      <a-button key="submit" type="primary" @click="methods.handleSubmit">提交</a-button>
    </template>
  </a-modal>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { getBase64 } from '@/utils/common/index'
import { message } from 'ant-design-vue'
import type { UploadChangeParam, UploadProps } from 'ant-design-vue'
import { getToken } from '@/utils/auth/index'
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
  fileList?: Array<UploadProps['fileList']>
  options?: Array<OptionsType>
}

const props = defineProps({
  refresh: Function,
  add: {
    type: Function,
    required: true,
  },
  edit: {
    type: Function,
    required: true,
  },
  tree: {
    type: Array,
  },
  labelCol: {
    type: Object,
    default: () => {
      return {
        xs: { span: 24 },
        sm: { span: 6 },
      }
    },
  },
  wrapperCol: {
    type: Object,
    default: () => {
      return {
        xs: { span: 24 },
        sm: { span: 16 },
      }
    },
  },
})

const formRef = ref()

const state = reactive({
  id: null,
  visible: false,
  loading: false as boolean,
  imageUrl: '' as string,
  fieldItemOptions: [] as FieldType[],
  uploadUrl: '/api/media/upload/coursefile',
  token: `Bearer ${getToken()}`,
  title: '',
  form: {
    userpic: '',
    url: '',
    pic: '',
    category: []
  },
  options: [] as any,
  
})

const methods = reactive({
  handleOpen: (show, record, options) => {
    if (record !== null) {
      state.id = record
      state.fieldItemOptions = []
      state.title = '修改'
      state.fieldItemOptions = options
      state.fieldItemOptions.map((obj, index) => {
        state.form[`${obj.key}`] = obj.value
      })
      state.options = props.tree
      
    } else {
      state.title = '新增'
      state.fieldItemOptions = options
      state.fieldItemOptions.map((obj, index) => {
        state.form[`${obj.key}`] = obj.value
      })
    }
    state.visible = show
  },
  handleCancel: () => {
    state.visible = false
    state.fieldItemOptions = []
  },
  beforeUpload: (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('只支持JPG格式图片')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('图片容量过大, 请上传小于2MB的图片')
    }
    return isJpgOrPng && isLt2M
  },
  handleChange: async (info: UploadChangeParam) => {
    if (info.file.status === 'uploading') {
      state.loading = true
      return
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as Blob, (base64Url: string) => {
        state.form.userpic = base64Url
        state.form.pic = base64Url
        state.loading = false
      })
      state.form.url = info.file.response.url
    }

    if (info.file.status === 'error') {
      state.loading = false
      message.error('upload error')
    }
  },
  handleSubmit: async () => {
    try {
      const values = await formRef.value.validateFields()
      if (state.title === '新增') {
        await props.add(values)
      } else {
        values.id = state.id
        values.userpic = state.form.url
        values.pic = state.form.url
        values.mt = state.form.category[0]
        values.st = state.form.category[1]
        await props.edit(values)
      }
      state.visible = false

      if (typeof props.refresh === 'function') {
        props.refresh()
      }
      message.success('操作成功')
    } catch (errorInfo) {
      message.error('信息格式错误,请仔细检查')
    }
  },
})

defineExpose({
  methods,
})
</script>
