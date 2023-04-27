import { createApp } from 'vue'
import App from './App.vue'
import install from '@/base/install'
import '@ant-design/icons-vue'



createApp(App).use(install).mount('#app')
