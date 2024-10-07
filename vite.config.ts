import { fileURLToPath, URL } from 'node:url'
import { resolve } from "node:path";

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from "vite-plugin-dts"

// https://vitejs.dev/config/
export default defineConfig({
  // Build demo 打開註解片段，並註解其他option
  // plugins: [
  //   vue(),
  // ],
  // base: process.env.NODE_ENV === 'production' ? '/img-comp-slider/' : '/',
  // resolve: {
  //   alias: {
  //     '@': fileURLToPath(new URL('./src', import.meta.url))
  //   }
  // }
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
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
