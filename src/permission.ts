import router from '@/router'
import { NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import { useUserStoreHook } from '@/pinia/modules/user'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  showSpinner: false,
  minimum: 0.25,
})

router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): Promise<void> => {
  NProgress.start()
  const userStore = useUserStoreHook()
  // 白名单路由
  const whiteList: String[] = ['/login'] as Array<String>
  if (userStore.token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next({ path: '/' })
    }
  } else {
    // 白名单
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next({ path: '/login'})
    }
  }
})

router.afterEach((): void => {
  NProgress.done()
})

