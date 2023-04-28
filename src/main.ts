import { createApp } from 'vue'
import App from './App.vue'
import install from '@/base/install'
import '@ant-design/icons-vue'
import { setupStore } from '@/pinia'
// import '@/permission'
const app = createApp(App)
setupStore(app)
app.use(install).mount('#app')
