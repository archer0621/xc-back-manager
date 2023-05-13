<style>
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
  <div class="dy-form">
    <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
      <div v-for="field in state.fieldItemOptions" :key="field.key">
        <a-form-item :label="field.label" :required="field.required">
          <template v-if="field.type === 'text'">
            <a-input
              :rules="[
                field.key,
                {
                  rules: [
                    {
                      required: field.required,
                      message: `${field.label}不能为空`,
                    },
                  ],
                  initialValue: field.value,
                },
              ]"
            />
          </template>
          <template v-else-if="field.type === 'textarea'">
            <a-textarea
              :placeholder="`请输入${field.label}`"
              :rules="[
                field.key,
                {
                  rules: [
                    {
                      required: field.required,
                      message: `${field.label}不能为空`,
                    },
                  ],
                  initialValue: field.value,
                },
              ]"
              :auto-size="{
                minRows: field.minRows || 5,
                maxRows: field.maxRows || 8,
              }"
              :maxLength="field.max || 256"
            />
          </template>
          <template v-else-if="field.type === 'select'">
            <a-select
              :placeholder="`请选择${field.label}`"
              :rules="[
                field.key,
                {
                  rules: [
                    {
                      required: field.required,
                      message: `请选择${field.label}`,
                    },
                  ],
                  initialValue: field.value,
                },
              ]"
            >
              <a-select-option v-for="option in field.options" :key="option.value" :value="option.value">
                {{ option.label }}
              </a-select-option>
            </a-select>
          </template>
          <template v-else-if="field.type === 'upload'">
            <a-upload 
              v-model:file-list="field.fileList" 
              name="filedata" 
              :headers="{ Authorization: state.token }"
              list-type="picture-card" 
              class="avatar-uploader" 
              :show-upload-list="false"
              :action="state.uploadUrl" 
              :before-upload="methods.beforeUpload" 
              @change="methods.handleChange"
            >
              <img v-if="state.imageUrl" :src="state.imageUrl" width="126" height="126" alt="avatar" />
              <div v-else>
                <loading-outlined v-if="state.loading"></loading-outlined>
                <plus-outlined v-else></plus-outlined>
                <div class="ant-upload-text">Upload</div>
              </div>
            </a-upload>
          </template>
          <template v-else-if="field.type === 'checkbox'">
            <a-checkbox-group
              :rules="[
                field.key,
                {
                  rules: [
                    {
                      required: field.required,
                      message: `请选择${field.label}`,
                    },
                  ],
                  initialValue: field.value,
                },
              ]"
            >
              <a-checkbox v-for="option in field.options" :key="option.value" :value="option.value" :style="{ width: field.width }">
                {{ option.label }}
              </a-checkbox>
            </a-checkbox-group>
          </template>
          <template v-else-if="field.type === 'radio'">
            <a-radio-group
              :rules="[
                field.key,
                {
                  rules: [
                    {
                      required: field.required,
                      message: `请选择${field.label}`,
                    },
                  ],
                  initialValue: field.value,
                },
              ]"
            >
              <a-radio v-for="option in field.options" :key="option.value" :value="option.value">
                {{ option.label }}
              </a-radio>
            </a-radio-group>
          </template>
        </a-form-item>
      </div>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import { deepCopy, getBase64 } from '@/utils/common/index'
import { message } from 'ant-design-vue';
import type { UploadChangeParam, UploadProps } from 'ant-design-vue';
import { getToken } from '@/utils/auth/index'
interface OptionsType {
  value: number,
  label: string
}

interface FieldType {
  label?: string,
  key?: string,
  value?: string,
  type?: string,
  width?: number,
  max?: number,
  minRows?: number,
  maxRows?: number
  required?: boolean,
  fileList?: Array<UploadProps['fileList']>,
  options?: Array<OptionsType>,
}

const props = defineProps({
  fieldOptions: {
    type: Array<FieldType>,
    default: () => [] as FieldType[]
  },
  model: {
    type: Object,
    default: () => ({})
  },
  labelCol: {
    type: Object,
    default: () => {
      return {
        xs: { span: 24 },
        sm: { span: 6 }
      }
    }
  },
  wrapperCol: {
    type: Object,
    default: () => {
      return {
        xs: { span: 24 },
        sm: { span: 16 }
      };
    }
  }
})

console.log(props.fieldOptions);


const state = reactive({
  loading: false as boolean,
  imageUrl: '' as string,
  fieldItemOptions: deepCopy(props.fieldOptions),
  uploadUrl: '/api/media/upload/coursefile',
  token: `Bearer ${getToken()}`
})

const methods = reactive({
  beforeUpload: (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只支持JPG格式图片');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片容量过大, 请上传小于2MB的图片');
    }
    return isJpgOrPng && isLt2M;
  },
  handleChange: async (info: UploadChangeParam) => {
    if (info.file.status === 'uploading') {
      state.loading = true;
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as Blob, (base64Url: string) => {
        state.imageUrl = base64Url;
        state.loading = false;
      });
    }
    if (info.file.status === 'error') {
      state.loading = false;
      message.error('upload error');
    }
  }
})



</script>
