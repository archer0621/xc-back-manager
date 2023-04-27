import { createRouter, createWebHashHistory, RouterOptions } from 'vue-router'
import type { App } from 'vue'
const routes = [
  {
    path: '/',
    name: 'manager',
    component: () => import('@/layout/index.vue'),
    children: [],
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: '登录页' },
    component: () => import('@/views/login/index.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory('/web.html'),
  routes,
} as RouterOptions)

const setUpRouter = (app: App) => {
  app.use(router)
}

export {
  setUpRouter
}
