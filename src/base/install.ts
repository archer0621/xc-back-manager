import type { App } from 'vue'
import setUpInit from './index'
import { readonly } from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import '@/style/index.less'

interface $optionsType {
  router?: {
      routes?: Array<any>,
  },
  config?: {
      httpNetwork?: object,
  }
}

const install = (app: App, options?: $optionsType) => {
  const _options: any = {
    configAppRouter: {
      routes: options?.router?.routes || []
    }
  }
  app.config.globalProperties = _options
  app.use(Antd)
  app.provide('$configAppOptions', readonly(_options))
  setUpInit(app)
}

export default install