<template>
  <div class="media_container">
    <div class="media_header">
      <a-button type="primary" @click="state.handleRefresh">刷新</a-button>
      <!-- <a-button class="add" @click="state.handleAddOpen">新增</a-button> -->
    </div>
    <div class="media_main">
      <MyTable :columns="media_columns" :getData="getMediaData" :key="state.timer">
        <template #fileType="{ record }">
          <span>
            <a-tag v-if="record.fileType === '001001'" :color="'green'">
              图片
            </a-tag>
            <a-tag v-else-if="record.fileType === '001002'" :color="'blue'">
              视频
            </a-tag>
            <a-tag v-else :color="'red'">
              其他
            </a-tag>
          </span>
        </template>
        <template #auditStatus="{ record }">
          <span>
            <a-tag v-if="record.auditStatus === '002001'" :color="'red'">
              审核未通过
            </a-tag>
            <a-tag v-else-if="record.auditStatus === '002002'" :color="'blue'">
              未审核
            </a-tag>
            <a-tag v-else :color="'green'">
              审核通过
            </a-tag>
          </span>
        </template>
        <template #status="{ record }">
          <span>
            <a-tag :color="record.status === '1' ? 'green' : 'red'">
              {{ record.status === '1' ? '正常' : '封禁中' }}
            </a-tag>
          </span>
        </template>
        
        <template #operation="{ record }">
          <div style="display: flex; justify-content: center">
            <a-button type="primary" size="small" @click="state.handleEditOpen(record)">审核</a-button>
            <a-popconfirm 
              :title="`你确定删除嘛？`" 
              @confirm="state.handleDel(record)" 
              cancel-text="关闭"
              ok-text="确认"
            >
              <a-button type="primary" size="small" danger>删除</a-button>
            </a-popconfirm>
            
          </div>
        </template>
      </MyTable>
      <Modal ref="form" 
        :add="api_add_user"
        :edit="api_edit_media"
        :options="state.add_form_options" 
        :refresh="state.handleRefresh"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import MyTable from '@/components/table/index.vue'
import Modal from '@/components/modal/index.vue'
import { message, UploadProps } from 'ant-design-vue';
import { 
  api_get_media,
  api_del_media,
  api_add_user,
  api_edit_media,
} from '@/service/index'
import { edit_field_options } from './media'
import { reactive, ref } from 'vue'
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

const form = ref()

const state = reactive({
  timer: 0,
  record: {},
  id: 0,
  add_form_options: [] as FieldType[],
  edit_form_options: [] as FieldType[],
  handleRefresh: () => {
    state.timer = new Date().getTime()
  },
  handleEditOpen: async (record) => {
    state.id = record.id
    console.log(state.id);
    const data = {
      auditStatus: record.auditStatus,
      auditMind: record.auditMind
    }
    state.edit_form_options = edit_field_options(data)
    form.value.methods.handleOpen(true, state.id, state.edit_form_options)
  },
  handleAddOpen: (record) => {
    state.id = record.id
    form.value.methods.handleOpen(true, null, state.add_form_options)
  },
  handleDel: async (record) => {
    await api_del_media(record.id)
    message.success('删除成功')
    state.handleRefresh()
  }
})

const media_columns = [
  {
    title: '机构名',
    dataIndex: 'companyName',
    width: 150,
    customFilterDropdown: true,
    onFilter: (value, record) => record.companyName.toString().toLowerCase().includes(value.toLowerCase()),
  },
  {
    title: '文件名称',
    dataIndex: 'filename',
    customFilterDropdown: true,
    onFilter: (value, record) => record.filename.toString().toLowerCase().includes(value.toLowerCase()),
  },
  {
    title: '文件类型',
    dataIndex: 'fileType',
    customFilterDropdown: true,
    onFilter: (value, record) => record.fileType.toString().toLowerCase().includes(value.toLowerCase()),
    isSlot: true,
    slots: { customRender: 'fileType' },
  },
  {
    title: '标签',
    dataIndex: 'tags',
    customFilterDropdown: true,
    width: 100,
    onFilter: (value, record) => record.tags.toString().toLowerCase().includes(value.toLowerCase()),
  },
  {
    title: '存储目录',
    dataIndex: 'bucket',
    customFilterDropdown: true,
    onFilter: (value, record) => record.bucket.toString().toLowerCase().includes(value.toLowerCase()),
  },
  {
    title: '媒资访问地址',
    dataIndex: 'url',
    customFilterDropdown: true,
    onFilter: (value, record) => record.url.toString().toLowerCase().includes(value.toLowerCase()),
  },
  {
    title: '上传人',
    dataIndex: 'username',
    customFilterDropdown: true,
    onFilter: (value, record) => record.username.toString().toLowerCase().includes(value.toLowerCase()),
  },
  {
    title: '上传时间',
    dataIndex: 'createDate',
    customFilterDropdown: true,
    onFilter: (value, record) => record.createDate.toString().toLowerCase().includes(value.toLowerCase()),
    sorter: (a, b) => {
      let aTimeString = a.createDate;
      let bTimeString = b.createDate;
      aTimeString = aTimeString.replace(/-/g, "/");
      bTimeString = bTimeString.replace(/-/g, "/");
      let aTime = new Date(aTimeString).getTime();
      let bTime = new Date(bTimeString).getTime();
      return bTime - aTime;
    },
  },
  {
    title: '文件容量',
    dataIndex: 'fileSize',
    customFilterDropdown: true,
    onFilter: (value, record) => record.fileSize.toString().toLowerCase().includes(value.toLowerCase()),
  },
  {
    title: '审核状态',
    dataIndex: 'auditStatus',
    customFilterDropdown: true,
    isSlot: true,
    slots: { customRender: 'auditStatus' },
    onFilter: (value, record) => record.auditStatus.toString().toLowerCase().includes(value.toLowerCase()),
  },
  {
    title: '审核意见',
    dataIndex: 'auditMind',
    customFilterDropdown: true,
    onFilter: (value, record) => record.auditStatus.toString().toLowerCase().includes(value.toLowerCase()),
  },
  {
    title: '状态',
    dataIndex: 'status',
    filters: [
      {
        text: '正常',
        value: 1,
      },
      {
        text: '封禁中',
        value: 0,
      },
    ],
    onFilter: (value, record) => record.status.indexOf(value) === 0,
    isSlot: true,
    slots: { customRender: 'status' },
  },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 100,
    isSlot: true,
    slots: { customRender: 'operation' },
  },
]

const getMediaData = async (page: number, pageSize: number) => {
  const { data } = await api_get_media(null, page, pageSize)
  return {
    dataList: data.items,
    total: data.counts,
  }  
}

</script>
<style lang="less">
.media_container {
  background-color: #fff;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .media_header {
    width: 98%;
    height: 50px;
    display: flex;
    .ant-btn {
      margin: 10px;
    }
    .add {
      color: #fff;
      border-color: #0dc60d;
      background: #16c628;
    }
  }
  .media_main {
    width: 98%;
    height: 93%;
    margin-top: 10px;
  }
}
.ant-btn {
  margin: 5px;
}
</style>
