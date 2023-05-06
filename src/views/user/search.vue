<template>
  <div class="stu_container">
    <div class="stu_header">
      <a-button type="primary">刷新</a-button>
      <a-button class="add">新增</a-button>
      <a-button type="primary" danger>删除</a-button>
    </div>
    <div class="stu_main">
      <a-table sticky :columns="columns" :data-source="data" :scroll="{ x: 1500 }">
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'operation'"><a>action</a></template>
        </template>
      </a-table>
    </div>
    <div class="stu_footer"></div>
  </div>
</template>
<script lang="ts">
import type { TableColumnsType } from 'ant-design-vue'
import { defineComponent, ref } from 'vue'
import { getUserList } from '@/service/index'
export default defineComponent({
  setup() {
    const columns = ref<TableColumnsType>([
      {
        title: 'Full Name',
        width: 100,
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
      },
      {
        title: 'Age',
        width: 100,
        dataIndex: 'age',
        key: 'age',
        fixed: 'left',
      },
      {
        title: 'Column 1',
        dataIndex: 'address',
        key: '1',
        width: 150,
      },
      {
        title: 'Column 2',
        dataIndex: 'address',
        key: '2',
        width: 150,
      },
      {
        title: 'Column 3',
        dataIndex: 'address',
        key: '3',
        width: 150,
      },
      {
        title: 'Column 4',
        dataIndex: 'address',
        key: '4',
        width: 150,
      },
      {
        title: 'Column 5',
        dataIndex: 'address',
        key: '5',
        width: 150,
      },
      {
        title: 'Column 6',
        dataIndex: 'address',
        key: '6',
        width: 150,
      },
      {
        title: 'Column 7',
        dataIndex: 'address',
        key: '7',
        width: 150,
      },
      { title: 'Column 8', dataIndex: 'address', key: '8' },
      {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100,
      },
    ])

    const data = []
    for (let i = 0; i < 100; i++) {
      data.push({
        key: i,
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
      })
    }
    return {
      data,
      columns,
    }
  },
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
</style>
