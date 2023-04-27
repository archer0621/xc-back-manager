import { setUpRouter } from '@/router/index'
import { App } from 'vue'

const setUpInit = (app: App) => {
  app.use(setUpRouter)
}

export default setUpInit