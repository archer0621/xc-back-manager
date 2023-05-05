<template>
  <a-layout-sider 
    :collapsed="collapsed" 
    :trigger="null" 
    collapsible
  >
    <div :class="logoClass">
    </div>
    <a-menu theme="dark" mode="inline">
      <a-menu-item key="/">
        <component is="bar-chart-outlined"/>
        <span>首页
          <router-link to="/index" />
        </span>
      </a-menu-item>
      <SidebarItem 
        v-for="menuItem in menu" 
        :key="menuItem.id" 
        :item="menuItem"
      />
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import SidebarItem from '@/layout/Sidebar/item.vue'
import { useUserStoreHook } from '@/pinia/modules/user'
const userStore = useUserStoreHook()
const menu = userStore.menus

let collapsed: any = inject('collapsed')

const logoClass = computed(() => {
  return !collapsed.value ? 'manager_logo' : 'manager_logo_mini'
})





</script>

<style lang="less">
.manager_logo {
  height: 55px;
  margin: 16px;
  background: url('@/assets/img/back.png') no-repeat;
  background-size: 170px 65px;
}

.manager_logo_mini {
  height: 25px;
  margin-left: 25px;
  margin-top: 20px;
  margin-bottom: 30px;
  background: url('@/assets/img/logo_mini.png') no-repeat;
  background-size: 35px 25px;
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>
