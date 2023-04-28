import router from '@/router/index'
import { App } from 'vue'

const setUpInit = (app: App) => {
  app.use(router)
}

export default setUpInit