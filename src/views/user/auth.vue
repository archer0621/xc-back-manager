<style scoped lang="less">
.auth {
  .ant-drawer-body {
    padding: 0 0 20px 0;
  }

  &-tabs {
    .ant-tabs-nav {
      padding: 0 10px;
    }
  }

  &-action {
    position: absolute;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    left: 0;
    background-color: #fff;
    border-radius: 0 0 4px 4px;
  }
}
</style>
<template>
  <a-drawer title="设置权限" placement="right" v-model:visible="state.visible" width="30%" class="auth">
    <a-tabs class="auth-tabs" v-model:activeKey="state.activeKey">
      <a-tab-pane key="1" tab="菜单权限">
        <div class="auth-body">
          <a-tree :checkStrictly="true" v-model:expandedKeys="state.expandedKeys" v-model:selectedKeys="state.selectedKeys" v-model:checkedKeys="state.checkedKeys" checkable :tree-data="state.treeData">
            <template #title="{ title, key }">
              <div>{{ title }}</div>
            </template>
            {{ tree_list }}
          </a-tree>
        </div>
      </a-tab-pane>
    </a-tabs>
    <div class="auth-action">
      <a-button type="primary" @click="state.handleSubmit">提交</a-button>
    </div>
  </a-drawer>
</template>
<script lang="ts">
import { onMounted, watch, ref, reactive, defineComponent } from 'vue'
import { usePermissionStoreHook } from '@/pinia/modules/permission'
import type { TreeProps } from 'ant-design-vue'
const permissionStore = usePermissionStoreHook()

export default defineComponent({
  setup(props, context) {
    const state = reactive({
      visible: false,
      activeKey: '1',
      record: {},
      expandedKeys: [],
      selectedKeys: [],
      checkedKeys: [],
      handleOpen: (show, record) => {
        state.visible = show
        if (record) {
          state.record = record
        }
      },
      handleInitCheck: (record) => {
        state.checkedKeys = []
        let arr = [] as any
        for (let i = 0; i < record.length; i++) {
          const element = record[i]
          arr.push(element.id)
          if (element.childrenTreeNodes) {
            for (let j = 0; j < element.childrenTreeNodes.length; j++) {
              arr.push(element.childrenTreeNodes[j].id)
            }
          }
        }
        state.checkedKeys = arr
      },
      handleSubmit: () => {
        context.emit('submit', state.checkedKeys)
      },
      treeData: [] as TreeProps['treeData'],
    })
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
    return {
      state,
      tree_list,
    }
  },
  mounted() {
    this.tree_list()
  },
})
</script>
