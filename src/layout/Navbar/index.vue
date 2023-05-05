<template>
  <a-layout-header class="layout-header">
    <div class="left">
      <!-- 顶部左侧 -->
      <menu-unfold-outlined v-if="collapsed" class="trigger" @click="updateCollapsed" />
      <menu-fold-outlined v-else class="trigger" @click="updateCollapsed" />
    </div>
    <div class="right">
      <ThemeBar />
    </div>
  </a-layout-header>
</template>
<script setup lang="ts">
import ThemeBar from './themeBar.vue'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { inject } from 'vue'
// 传递collapsed实现伸缩菜单框
const collapsed: any = inject('collapsed')
const updateCollapsed = () => {
  collapsed.value = !collapsed.value
}

</script>

<style scoped lang="less">
.layout-header {
  background: #fff;
  padding: 0;
  display: flex;
  justify-content: space-between;
  .left {
    .trigger {
      font-size: 18px;
      line-height: 64px;
      padding: 0 24px;
      cursor: pointer;
      transition: color 0.3s;
    }
    .trigger:hover {
      color: #1890ff;
    }
  }

  .right {
    margin-right: 24px;
  }
}
</style>
