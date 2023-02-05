import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'http://battleship-server:3001',
        changeOrigin: true,
        secure: false,
      },
      // Proxying websockets or socket.io
      '/socket.io': {
        target: 'ws://battleship-server:3001',
        ws: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      'xmlhttprequest-ssl':
        './node_modules/engine.io-client/lib/xmlhttprequest.js',
    },
  },
})
