import router from '@/router'
import { NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import { useUserStoreHook } from '@/pinia/modules/user'
import { usePermissionStoreHook } from '@/pinia/modules/permission'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  showSpinner: false,
  minimum: 0.25,
})

router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): Promise<void> => {
  NProgress.start()
  const userStore = useUserStoreHook()
  const permissionStore = usePermissionStoreHook()

  // 白名单路由
  const whiteList: String[] = ['/login'] as Array<String>
  if (userStore.token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      const gotUserInfo: boolean = Object.keys(userStore.roles).length > 0
      if (gotUserInfo) {
        if (to.matched.length === 0) {
          from.path ? next({ path: from.path as string }) : next('/401')
        } else {
          next()
        }
      } else {
        await userStore.getInfo()
        const accessRoutes: RouteRecordRaw[] = await permissionStore.getRoutes()
        accessRoutes.forEach((route: RouteRecordRaw) => router.addRoute(route))
        next({ ...to, replace: true })
      }
    }
  } else {
    // 白名单
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})

router.afterEach((): void => {
  NProgress.done()
})
