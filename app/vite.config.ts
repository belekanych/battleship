import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
      // Proxying websockets or socket.io
      '/socket.io': {
        target: 'ws://localhost:3001',
        ws: true
      }
    },
  },
  resolve: {
    alias: {
      "xmlhttprequest-ssl": "./node_modules/engine.io-client/lib/xmlhttprequest.js"
    }
  }
})
