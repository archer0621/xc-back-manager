import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'
import { ref } from 'vue'
import { AxiosResponse } from 'axios'
import { getUserInfo as getInfoApi } from '@/service/index'
import { routes as constantRoutes } from '@/router'
import { store } from '@/pinia'
const modules = import.meta.glob("/src/views/**/*.vue")
export const Layout = () => import('@/layout/index.vue')

export const usePermissionStore = defineStore('permission', () => {
  const routes = ref<RouteRecordRaw[]>([])
  const getAsyncRoutes = (routes: RouteRecordRaw[]) => {
    const res: RouteRecordRaw[] = []
    routes.forEach((route: RouteRecordRaw): void => {
      const temp = {} as any
      temp.path = route.path
      temp.name = route.name
      temp.meta = {
        title: route.meta,
      }
      if (temp.component == 'Layout') {
        temp.component = Layout
      } else {
        // temp.component = modules[`../views/${route.component}.vue`] as any
        temp.component = modules[`/src/views${route.component}.vue`] as any
      }
      
      res.push(temp)
    })
    return res
  }
  const getRoutes = (): Promise<RouteRecordRaw[]> => {
    return new Promise<RouteRecordRaw[]>((resolve, reject): void => {
      getInfoApi().then((data: AxiosResponse<any, any>): void => {
        const asyncRoutes = [...data.data.data.routerList]
        const accessedRoutes: RouteRecordRaw[] = getAsyncRoutes(asyncRoutes)
        console.log(accessedRoutes);
        routes.value = constantRoutes.concat(accessedRoutes)
        console.log(routes.value);
        resolve(accessedRoutes)
      }).catch((error): void => {
        reject(error)
      })
    })
  }
  return {
    routes,
    getRoutes
  }
})

export const usePermissionStoreHook = () => {
  return usePermissionStore(store)
}
