import { createRouter, createWebHistory } from 'vue-router'
import TheHomePage from '../pages/TheHomePage.vue'
import TheSessionPage from '../pages/sessions/TheSessionPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: TheHomePage,
  },
  {
    path: '/sessions',
    name: 'Session',
    component: TheSessionPage,
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router