import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router'

// 静态路由表
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true },
  },
  {
    path: '/',
    name: '',
    component: () => import('@/layout/index.vue'),
    meta: { hidden: true },
    children: [
      {
        path: '/index',
        component: () => import('@/layout/Main/main.vue'),
        meta: { title: '首页'}
      },
      {
        path: '/:catchAll(.*)',
        name: '404',
        component: () => import('@/views/error/index.vue'),
      },
    ]
  },
  // {
  //   path: '/:catchAll(.*)',
  //   name: '404',
  //   component: () => import('@/views/error/index.vue'),
  // },
]

export const dynamicRoutes: Array<RouteRecordRaw> = []

// 重置路由
export const resetRouter = (): void => {}

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
