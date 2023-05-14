<template>
  <div class="stu_container">
    <div class="stu_header">
      <a-button type="primary" @click="state.handleRefresh">刷新</a-button>
      <a-button class="add" @click="state.handleAddOpen">新增</a-button>
    </div>
    <div class="stu_main">
      <MyTable :columns="user_columns" :getData="getUserData" :key="state.timer">
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
            <a-button type="primary" size="small" @click="state.handleEditOpen(record)">修改</a-button>
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
        :edit="api_edit_user"
        :options="state.add_form_options" 
        :refresh="state.handleRefresh"/>
    </div>
    <div class="stu_footer"></div>
  </div>
</template>
<script setup lang="ts">
import MyTable from '@/components/table/index.vue'
import Modal from '@/components/modal/index.vue'
import { getUserList, api_select_role, api_get_user, api_del_user } from '@/service/index'
import { onMounted, reactive, ref } from 'vue'
import { edit_field_options, add_field_options } from './userForm'
import { message, UploadProps } from 'ant-design-vue';
import { api_add_user, api_edit_user } from '@/service/index'
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
    const role = await api_select_role();
    const { data } = await api_get_user(record.id,)
    state.edit_form_options = edit_field_options(data.data, role.data.data)
    form.value.methods.handleOpen(true, state.id, state.edit_form_options)
  },
  handleAddOpen: (record) => {
    state.id = record.id
    form.value.methods.handleOpen(true, null, state.add_form_options)
  },
  handleDel: async (record) => {
    await api_del_user(record.id)
    message.success('删除用户成功')
    state.handleRefresh()
  }
})
const user_columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    customFilterDropdown: true,
    onFilter: (value, record) => record.username.toString().toLowerCase().includes(value.toLowerCase()),
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    customFilterDropdown: true,
    onFilter: (value, record) => record.nickname.toString().toLowerCase().includes(value.toLowerCase()),
  },
  {
    title: '角色',
    dataIndex: 'roleName',
    customFilterDropdown: true,
    onFilter: (value, record) => record.roleName.toString().toLowerCase().includes(value.toLowerCase()),
  },
  {
    title: '性别',
    dataIndex: 'sex',
    filters: [
      {
        text: '男',
        value: '1',
      },
      {
        text: '女',
        value: '0',
      },
    ],
    onFilter: (value, record) => record.sex.indexOf(value) === 0,
    isSlot: true,
    slots: { customRender: 'sex' },
  },
  {
    title: 'QQ号',
    dataIndex: 'qq',
    customFilterDropdown: true,
    onFilter: (value, record) => record.qq.toString().toLowerCase().includes(value.toLowerCase()),
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    customFilterDropdown: true,
    onFilter: (value, record) => record.email.toString().toLowerCase().includes(value.toLowerCase()),
  },
  {
    title: '头像',
    dataIndex: 'userpic',
    isSlot: true,
    slots: { customRender: 'userpic' },
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
const getUserData = async (page: number, pageSize: number) => {
  const { data } = await getUserList(null, page, pageSize)
  return {
    dataList: data.items,
    total: data.counts,
  }
}

const get_select_role = async () => {
  const { data } = await api_select_role();
  state.add_form_options = add_field_options(data.data)
}

onMounted(() => {
  get_select_role()
})

</script>
<style lang="less">
.stu_container {
  background-color: #fff;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .stu_header {
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
  .stu_main {
    width: 98%;
    height: 93%;
    margin-top: 10px;
  }
}
.ant-btn {
  margin: 5px;
}
</style>
