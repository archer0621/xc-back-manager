<template>
  <div class="table-container">
    <a-table :rowKey="(record) => record.id" :columns="columns" :data-source="state.data" :loading="state.loading" :pagination="{ ...state.pagination }" @change="handlePageChange" :total="state.pagination.total">
      <template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
        <div style="padding: 8px">
          <a-input
            ref="searchInput"
            :placeholder="`Search ${column.dataIndex}`"
            :value="selectedKeys[0]"
            style="width: 188px; margin-bottom: 8px; display: block"
            @change="(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
            @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
          />
          <a-button type="primary" size="small" style="width: 90px; margin-right: 8px" @click="handleSearch(selectedKeys, confirm, column.dataIndex)">
            <template #icon><SearchOutlined /></template>
            Search
          </a-button>
          <a-button size="small" style="width: 90px" @click="handleReset(clearFilters)"> Reset </a-button>
        </div>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'sex'">
          <span>
            <a-tag :color="record.sex === '1' ? 'geekblue' : 'green'">
              {{ record.sex === '1' ? '男' : '女' }}
            </a-tag>
          </span>
        </template>
        <template v-if="column.dataIndex === 'userpic'">
          <a-image :src="record.userpic" :width="40" :height="40" />
        </template>
        <template v-if="column.dataIndex === 'status'">
          <span>
            <a-tag :color="record.status === '1' ? 'green' : 'red'">
              {{ record.status === '1' ? '正常' : '封禁中' }}
            </a-tag>
          </span>
        </template>
        <template v-if="column.key === 'operation'">
          <div style="display: flex; justify-content: center">
            <a-button type="primary" size="small">修改</a-button>
            <a-button type="primary" size="small" danger>删除</a-button>
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
interface IPagination {
  total: number
  current: number
  pageSize: number
}

const props = defineProps({
  columns: {
    type: Array,
    require: true,
  },
  getData: {
    type: Function,
    require: true,
  },
})

const state = reactive({
  data: [] as any[],
  loading: false,
  pagination: {
    current: 1,
    pageSize: 5,
    pageSizeOptions: ['1', '5', '10', '20'],
    total: 0,
    showTotal: (total) => `共${total}条数据`,
    showSizeChanger: true,
    showQuickJumper: true,
    onShowSizeChange: (current, pageSize) => {
      ;(state.pagination.pageSize = pageSize), (state.pagination.current = 1)
    },
  },
  searchText: '',
  searchedColumn: '',
})

const handleSearch = (selectedKeys, confirm, dataIndex) => {
  confirm()
  state.searchText = selectedKeys[0]
  state.searchedColumn = dataIndex
}

const handleReset = (clearFilters) => {
  clearFilters({ confirm: true })
  state.searchText = ''
}

const queryData = async (current: number, pageSize: number) => {
  try {
    state.loading = true
    const { dataList, total } = await props.getData!(current, pageSize)
    state.data = dataList
    state.pagination.total = total
  } finally {
    state.loading = false
  }
}

const handlePageChange = async (form: any) => {
  state.pagination.current = form.current
  await queryData(form.current, form.pageSize)
}

onMounted(() => {
  handlePageChange(state.pagination)
})
</script>
<style scoped lang="less">
.ant-btn {
  margin: 5px;
}
</style>
