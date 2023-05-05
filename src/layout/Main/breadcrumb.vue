<template>
  <a-breadcrumb style="margin: 16px 0" class="breadcrumb">
    <a-breadcrumb-item v-for="item in breadcrumbs" :key="item.name">
      {{ item.meta?.title }}
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts" setup>
import { watch, onBeforeMount, ref } from 'vue'
import { useRoute, RouteRecordRaw, RouteLocationMatched } from 'vue-router'
const route = useRoute()
// 获取当前所在路由的所有父级路由
const getBreadcrumbRoutes = (route, routes: RouteRecordRaw[] = []) => {
  routes.unshift(route)
  if (route.parent) {
    getBreadcrumbRoutes(route.parent, routes)
  }
  return routes
}
// 根据路由的 meta 中的 breadcrumbName 来获取面包屑名称
const getBreadcrumbName = (route: RouteRecordRaw) => {
  return route.meta?.breadcrumbName || route.name
}
// 根据当前路由来生成面包屑的路由
const breadcrumbs = ref([] as Array<RouteLocationMatched>)
watch(route, () => {
  breadcrumbs.value = route.matched.slice(1)
})
onBeforeMount(() => {
  breadcrumbs.value = route.matched.slice(1)
})
</script>
