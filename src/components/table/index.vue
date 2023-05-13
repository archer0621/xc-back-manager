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
            查找
          </a-button>
          <a-button size="small" style="width: 90px" @click="handleReset(clearFilters)">重置</a-button>
        </div>
      </template>
      <template v-for="(value, key) in slot" v-slot:[key]="slotProps" :key="key">
        <slot :name="key" v-bind="slotProps"></slot>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, useSlots } from 'vue'
interface IPagination {
  total: number
  current: number
  pageSize: number
}

const slot = useSlots()

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
    pageSize: 10,
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

const show_drawer = (id) => {
  console.log('click it: ', id)
}

onMounted(() => {
  handlePageChange(state.pagination)
})
</script>
