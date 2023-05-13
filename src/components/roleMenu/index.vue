<style></style>
<template>
  <a-tree v-model:expandedKeys="expandedKeys" v-model:selectedKeys="selectedKeys" v-model:checkedKeys="checkedKeys" checkable :tree-data="state.treeData">
    <template #title="{ title, key }">
      <div>{{ title }}</div>
    </template>
    {{ tree_list }}
  </a-tree>
</template>
<script setup lang="ts">
import { onMounted, watch, ref, reactive, inject } from 'vue'
import { usePermissionStoreHook } from '@/pinia/modules/permission'
import type { TreeProps } from 'ant-design-vue'
const permissionStore = usePermissionStoreHook()

const expandedKeys = ref<string[]>([])
const selectedKeys = ref<string[]>([])
const checkedKeys = ref<string[]>([])

const props = defineProps({
  record: {
    type: Object,
    default: {},
  },
})

const state = reactive({
  recordData: {},
  treeData: [] as TreeProps['treeData'],
})

const record = inject('record')
console.log('record', record);

const tree_list = async () => {
  const { data } = await permissionStore.getRoleMenu()
  state.treeData = data.map((item) => {
    const { id, name, childrenTreeNodes } = item
    return {
      title: `${name}`,
      key: `${id}`,
      children: childrenTreeNodes.map((child) => ({
        title: `${child.name}`,
        key: `${child.id}`,
      })),
    }
  })
}

watch(expandedKeys, () => {
  console.log('expandedKeys', expandedKeys)
})
watch(selectedKeys, () => {
  console.log('selectedKeys', selectedKeys)
})
watch(checkedKeys, () => {
  console.log('checkedKeys', checkedKeys)
})

watch(props, ({ record }) => {
  state.recordData = record
  console.log('recordData', state.recordData)
})



onMounted(() => {
  tree_list()
})
</script>
