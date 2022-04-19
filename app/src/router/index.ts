import { createRouter, createWebHistory } from 'vue-router'
import TheHomePage from '../pages/TheHomePage.vue'
import TheCreateSessionPage from '../pages/sessions/TheCreateSessionPage.vue'
import TheJoinSessionPage from '../pages/sessions/TheJoinSessionPage.vue'
import TheSetupSessionPage from '../pages/sessions/TheSetupSessionPage.vue'
import TheShowSessionPage from '../pages/sessions/TheShowSessionPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: TheHomePage,
  },
  {
    path: '/sessions/create',
    name: 'sessions.create',
    component: TheCreateSessionPage,
  },
  {
    path: '/sessions/:sessionId',
    name: 'sessions.show',
    component: TheShowSessionPage,
    props: true,
  },
  {
    path: '/sessions/:sessionId/join',
    name: 'sessions.join',
    component: TheJoinSessionPage,
    props: true,
  },
  {
    path: '/sessions/:sessionId/setup',
    name: 'sessions.setup',
    component: TheSetupSessionPage,
    props: true,
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router