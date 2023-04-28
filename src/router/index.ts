import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router'

// 静态路由表
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true }
  }
]

export const dynamicRoutes: Array<RouteRecordRaw> = [
  
]


// 重置路由
export const resetRouter = (): void => {
  
}

const router: Router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
