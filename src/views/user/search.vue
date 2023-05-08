<template>
  <div class="stu_container">
    <div class="stu_header">
      <a-button type="primary" @click="handleRefresh">刷新</a-button>
      <a-button class="add">新增</a-button>
      <a-button type="primary" danger>删除</a-button>
    </div>
    <div class="stu_main">
      <MyTable :columns="user_columns" :getData="getUserData" :key="timer" />
    </div>
    <div class="stu_footer"></div>
  </div>
</template>
<script setup lang="ts">
import MyTable from '@/components/table/index.vue'
import { getUserList } from '@/service/index'
import { ref } from 'vue'
const timer = ref(0)
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
  },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 100,
  },
]
const getUserData = async (page: number, pageSize: number) => {
  const { data } = await getUserList(null, page, pageSize)
  return {
    dataList: data.items,
    total: data.counts,
  }
}

const handleRefresh = async () => {
  timer.value = new Date().getTime()
}
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
</style>
