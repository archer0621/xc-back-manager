<template>
  <div class="course_container">
    <div class="course_header">
      <a-button type="primary" @click="state.handleRefresh">刷新</a-button>
      <!-- <a-button class="add" @click="state.handleAddOpen">新增</a-button> -->
    </div>
    <div class="course_main">
      <MyTable :columns="course_columns" :getData="getCourseData" :key="state.timer">
        <template #auditStatus="{ record }">
          <span>
            <a-tag v-if="record.auditStatus === '202001'" :color="'red'">
              审核未通过
            </a-tag>
            <a-tag v-else-if="record.auditStatus === '202002'" :color="'blue'">
              未提交
            </a-tag>
            <a-tag v-else-if="record.auditStatus === '202003'" :color="'yellow'">
              已提交
            </a-tag>
            <a-tag v-else :color="'green'">
              审核通过
            </a-tag>
          </span>
        </template>
        <template #grade="{ record }">
          <span>
            <a-tag v-if="record.grade === '204001'" :color="'red'">
              初级
            </a-tag>
            <a-tag v-else-if="record.grade === '204002'" :color="'blue'">
              中级
            </a-tag>
            <a-tag v-else="record.grade === '204003'" :color="'yellow'">
              高级
            </a-tag>
          </span>
        </template>
        <template #pic="{ record }">
          <span>
            <a-image :src="record.pic" :width="40" :height="40" />
          </span>
        </template>
        <template #teachmode="{ record }">
          <span>
            <a-tag v-if="record.teachmode === '200002'" :color="'blue'">
              录播
            </a-tag>
            <a-tag v-else-if="record.teachmode === '200003'" :color="'green'">
              直播
            </a-tag>
          </span>
        </template>
        <template #status="{ record }">
          <span>
            <a-tag v-if="record.status === '203001'" :color="'blue'">
              未发布
            </a-tag>
            <a-tag v-else-if="record.status === '203002'" :color="'green'">
              已发布
            </a-tag>
            <a-tag v-else :color="'red'">
              已下线
            </a-tag>
          </span>
        </template>
        <template #charge="{ record }">
          <span>
            <a-tag v-if="record.charge === '201000'" :color="'blue'">
              免费
            </a-tag>
            <a-tag v-else="record.charge === '201001'" :color="'red'">
              收费
            </a-tag>
          </span>
        </template>
        
        <template #operation="{ record }">
          <div style="display: flex; justify-content: center">
            <a-button type="primary" size="small" @click="state.handleEditOpen(record)">编辑</a-button>
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
        :edit="api_edit_course"
        :tree="state.cate_tree"
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
  api_get_course,
  api_del_course,
  api_add_user,
  api_edit_course,
  api_cate_type
} from '@/service/index'
import { edit_field_options } from './course'
import { onMounted, reactive, ref } from 'vue'
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
  cate_tree: [],
  handleRefresh: () => {
    state.timer = new Date().getTime()
  },
  handleEditOpen: async (record) => {
    state.id = record.id
    state.edit_form_options = edit_field_options(record)
    form.value.methods.handleOpen(true, state.id, state.edit_form_options)
  },
  handleAddOpen: (record) => {
    state.id = record.id
    form.value.methods.handleOpen(true, null, state.add_form_options)
  },
  handleDel: async (record) => {
    try {
      await api_del_course(record.id)
      message.success('删除成功')
    } catch (e: any) {
      message.error(e.response.data.errMessage)
    }
    state.handleRefresh()
  }
})

const course_columns = [
  {
    title: '机构名',
    dataIndex: 'companyName',
    width: 100,
    customFilterDropdown: true,
    onFilter: (value, record) => record.companyName.toString().toLowerCase().includes(value.toLowerCase()),
  },
  {
    title: '课程名称',
    dataIndex: 'name',
    customFilterDropdown: true,
    ellipsis: true,
    onFilter: (value, record) => record.name.toString().toLowerCase().includes(value.toLowerCase()),
  },
  {
    title: '适用人群',
    dataIndex: 'users',
    customFilterDropdown: true,
    onFilter: (value, record) => record.users.toString().toLowerCase().includes(value.toLowerCase()),
    ellipsis: true,
  },
  // {
  //   title: '课程标签',
  //   dataIndex: 'tags',
  //   customFilterDropdown: true,
  //   width: 150,
  //   ellipsis: true,
  //   onFilter: (value, record) => record.tags.toString().toLowerCase().includes(value.toLowerCase()),
  // },
  {
    title: '课程大类',
    dataIndex: 'maxCategory',
    customFilterDropdown: true,
    onFilter: (value, record) => record.maxCategory.toString().toLowerCase().includes(value.toLowerCase()),
  },
  {
    title: '课程小类',
    dataIndex: 'minCategory',
    customFilterDropdown: true,
    onFilter: (value, record) => record.minCategory.toString().toLowerCase().includes(value.toLowerCase()),
  },
  {
    title: '课程等级',
    dataIndex: 'grade',
    isSlot: true,
    slots: { customRender: 'grade' },
    filters: [
      {
        text: '初级',
        value: '203001',
      },
      {
        text: '中级',
        value: '203002',
      },
      {
        text: '高级',
        value: '202003',
      }
    ],
    onFilter: (value, record) => record.grade.indexOf(value) === 0,
  },
  {
    title: '课程模式',
    dataIndex: 'teachmode',
    isSlot: true,
    slots: { customRender: 'teachmode' },
    filters: [
      {
        text: '录播',
        value: '200002',
      },
      {
        text: '直播',
        value: '202003',
      },
    ],
    onFilter: (value, record) => record.teachmode.indexOf(value) === 0,
    ellipsis: true,
  },
  // {
  //   title: '课程介绍',
  //   dataIndex: 'description',
  //   customFilterDropdown: true,
  //   onFilter: (value, record) => record.description.toString().toLowerCase().includes(value.toLowerCase()),
  //   ellipsis: true,
  // },
  {
    title: '课程图片',
    dataIndex: 'pic',
    isSlot: true,
    slots: { customRender: 'pic' },
  },
  {
    title: '收费规则',
    dataIndex: 'charge',
    ellipsis: true,
    filters: [
      {
        text: '免费',
        value: '201000',
      },
      {
        text: '收费',
        value: '202001',
      },
    ],
    onFilter: (value, record) => record.charge.indexOf(value) === 0,
    isSlot: true,
    slots: { customRender: 'charge' },
  },
  {
    title: '原价',
    dataIndex: 'price',
    customFilterDropdown: true,
    onFilter: (value, record) => record.price.toString().toLowerCase().includes(value.toLowerCase()),
    ellipsis: true,
  },
  {
    title: '现价',
    dataIndex: 'originalPrice',
    customFilterDropdown: true,
    onFilter: (value, record) => record.originalPrice.toString().toLowerCase().includes(value.toLowerCase()),
    ellipsis: true,
  },
  {
    title: 'QQ',
    dataIndex: 'qq',
    customFilterDropdown: true,
    onFilter: (value, record) => record.qq.toString().toLowerCase().includes(value.toLowerCase()),
    ellipsis: true,
  },
  {
    title: '微信',
    dataIndex: 'wechat',
    customFilterDropdown: true,
    onFilter: (value, record) => record.wechat.toString().toLowerCase().includes(value.toLowerCase()),
    ellipsis: true,
  },
  {
    title: '联系方式',
    dataIndex: 'phone',
    customFilterDropdown: true,
    onFilter: (value, record) => record.phone.toString().toLowerCase().includes(value.toLowerCase()),
    ellipsis: true,
  },
  {
    title: '有效期(天)',
    dataIndex: 'validDays',
    customFilterDropdown: true,
    onFilter: (value, record) => record.validDays.toString().toLowerCase().includes(value.toLowerCase()),
    ellipsis: true,
  },
  // {
  //   title: '创建时间',
  //   dataIndex: 'createDate',
  //   customFilterDropdown: true,
  //   ellipsis: true,
  //   onFilter: (value, record) => record.createDate.toString().toLowerCase().includes(value.toLowerCase()),
  // },
  {
    title: '创建人',
    dataIndex: 'createPeople',
    customFilterDropdown: true,
    onFilter: (value, record) => record.createPeople.toString().toLowerCase().includes(value.toLowerCase()),
  },
  {
    title: '审核状态',
    dataIndex: 'auditStatus',
    filters: [
      {
        text: '审核未通过',
        value: '202001',
      },
      {
        text: '未提交',
        value: '202002',
      },
      {
        text: '已提交',
        value: '202003',
      },
      {
        text: '审核通过',
        value: '202004',
      }
    ],
    onFilter: (value, record) => record.status.indexOf(value) === 0,
    isSlot: true,
    slots: { customRender: 'auditStatus' },
  },
  {
    title: '状态',
    dataIndex: 'status',
    filters: [
      {
        text: '未发布',
        value: '203001',
      },
      {
        text: '已发布',
        value: '203002',
      },
      {
        text: '已下线',
        value: '203003',
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

const getCourseData = async (page: number, pageSize: number) => {
  const { data } = await api_get_course(null, page, pageSize)
  return {
    dataList: data.items,
    total: data.counts,
  }  
}

const getCateTree = async () => {
  const { data } = await api_cate_type()
  state.cate_tree =  data.map((item) => ({
      value: item.id,
      label: item.label,
      children: item.childrenTreeNodes.map((item) => ({
        value: item.id,
        label: item.label,
      }))
  }))
}

onMounted(() => {
  getCateTree()
})

</script>
<style lang="less">
.course_container {
  background-color: #fff;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .course_header {
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
  .course_main {
    width: 98%;
    height: 93%;
    margin-top: 10px;
  }
}
.ant-btn {
  margin: 5px;
}
</style>
