import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'

const app = createApp(App)
  .use(router)
  .use(store)

router.isReady().then(() => {
  app.mount('#app')
})
