import { fileURLToPath, URL } from 'node:url'
import { resolve } from "node:path";

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from "vite-plugin-dts"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts()
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: 'ImgCompSlider',
      fileName: 'img-comp-slider'
    },
    rollupOptions: {
      // 確保 Vue 外置，不會被打包到庫中
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    },
    cssCodeSplit: false // 禁用 CSS 分割，將其嵌入到 JS 中
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
