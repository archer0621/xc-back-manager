<template>
  <div class="role_container">
    <div class="role_header">
      <a-button type="primary" @click="state.handleRefresh">刷新</a-button>
      <a-button class="add" @click="state.handleAddOpen">新增</a-button>
    </div>
    <div class="role_main">
      <MyTable :columns="role_columns" :getData="get_role_data" :key="state.timer">
        <template #sex="{ record }">
          <span>
            <a-tag :color="record.sex === '1' ? 'geekblue' : 'green'">
              {{ record.sex === '1' ? '男' : '女' }}
            </a-tag>
          </span>
        </template>
        <template #userpic="{ record }">
          <span>
            <a-image :src="record.userpic" :width="40" :height="40" />
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
            <a-button size="small" @click="state.handleAuthOpen(record)">设置权限</a-button>
            <a-button type="primary" size="small" @click="state.handleEditOpen(record)">修改</a-button>
            <a-popconfirm 
              :title="`你确定删除嘛？此操作会将对应用户全部删除！`" 
              @confirm="state.handleDel(record)" 
              cancel-text="关闭"
              ok-text="确认"
            >
              <a-button type="primary" size="small" danger>删除</a-button>
            </a-popconfirm>
          </div>
        </template>
      </MyTable>
      <Auth ref="auth" @submit="state.handleAuthSubmit"/>
      <Modal 
        ref="form"  
        :add="api_add_role" 
        :edit="api_update_role" 
        :refresh="state.handleRefresh"
        />
    </div>
    <div class="stu_footer"></div>
  </div>
</template>
<script setup lang="ts">
import MyTable from '@/components/table/index.vue'
import Auth from './auth.vue'
import Modal from '@/components/modal/index.vue'
import { message, UploadProps } from 'ant-design-vue';
import { 
  get_role, 
  api_role_tree, 
  api_edit_role,
  api_add_role,
  api_get_role,
  api_update_role,
  api_del_role 
} from '@/service/index'
import { reactive, ref } from 'vue'
import { add_field_options, edit_field_options} from './roleForm'
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


const auth = ref()
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
  handleAuthOpen: async (record) => {
    state.id = record.id
    state.record = await role_tree_list(record.id)
    auth.value.state.handleOpen(true, state.record)
    auth.value.state.handleInitCheck(state.record)
  },
  handleAuthSubmit: (menus) => {
    api_edit_role(state.id, menus.checked).then(() => {
      auth.value.state.handleOpen(false)
      message.success('添加权限成功')
    }).catch(e => {
      message.error('添加权限失败')
    }) 
  },
  handleAddOpen: (record) => {
    state.id = record.id
    state.add_form_options = add_field_options()
    form.value.methods.handleOpen(true, null, state.add_form_options)
  },
  handleEditOpen: async (record) => {
    state.id = record.id
    const { data } = await api_get_role(record.id)
    state.edit_form_options = edit_field_options(data.data)
    form.value.methods.handleOpen(true, state.id, state.edit_form_options)
  },
  handleDel: async (record) => {
    await api_del_role(record.id)
    message.success('删除角色成功')
    state.handleRefresh()
  }
})




const role_columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: '角色名',
    dataIndex: 'roleName',
    customFilterDropdown: true,
    onFilter: (value, record) => record.roleName.toString().toLowerCase().includes(value.toLowerCase()),
  },
  {
    title: '角色编码',
    dataIndex: 'roleCode',
    customFilterDropdown: true,
    onFilter: (value, record) => record.roleCode.toString().toLowerCase().includes(value.toLowerCase()),
  },
  {
    title: '角色描述',
    dataIndex: 'description',
    customFilterDropdown: true,
    onFilter: (value, record) => record.description.toString().toLowerCase().includes(value.toLowerCase()),
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    sorter: (a, b) => a.createTime - b.createTime,
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

const get_role_data = async (page: number, pageSize: number) => {
  const { data } = await get_role(null, page, pageSize)
  return {
    dataList: data.items,
    total: data.counts,
  }
}

const role_tree_list = async (id) => {
  const { data } = await api_role_tree(id)
  return data.data
}
</script>
<style lang="less">
.role_container {
  background-color: #fff;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .role_header {
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
  .role_main {
    width: 98%;
    height: 93%;
    margin-top: 10px;
  }
}
.ant-btn {
  margin: 5px;
}
</style>
