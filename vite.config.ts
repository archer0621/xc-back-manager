import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    hmr: true,
    cors: true, // 默认启用并允许所有源
    open: true, // 服务器启动时浏览器自动打开项目
    // 配置反向代理
    proxy: {
      '/api': {
        target: 'http://362b6e78.r8.cpolar.top',
        changeOrigin: true,
        ws: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
