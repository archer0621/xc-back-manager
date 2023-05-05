import type { App } from 'vue'
import setUpInit from './index'
import { readonly } from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import * as icon from '@ant-design/icons-vue'
import '@/style/index.less'

interface $optionsType {
  router?: {
    routes?: Array<any>
  }
  config?: {
    httpNetwork?: object
  }
}

const install = (app: App, options?: $optionsType) => {
  const _options: any = {
    configAppRouter: {
      routes: options?.router?.routes || [],
    },
  }
  // 设置antd-icon全局属性
  Object.keys(icon).forEach((key) => {
    app.component(key, icon[key as keyof typeof icon])
  })
  app.config.globalProperties.$icon = icon

  app.config.globalProperties = _options
  app.use(Antd)
  app.provide('$configAppOptions', readonly(_options))
  setUpInit(app)
}

export default install
