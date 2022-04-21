import { createRouter, createWebHistory } from 'vue-router'
import TheHomePage from '../pages/TheHomePage.vue'
import TheCreateSessionPage from '../pages/host/TheCreateSessionPage.vue'
import TheJoinSessionPage from '../pages/client/TheJoinSessionPage.vue'
import TheShowSessionPage from '../pages/host/TheShowSessionPage.vue'
import TheSetupSessionPage from '../pages/client/TheSetupSessionPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: TheHomePage,
  },
  {
    path: '/host/sessions/create',
    name: 'host.sessions.create',
    component: TheCreateSessionPage,
  },
  {
    path: '/host/sessions/:sessionId',
    name: 'host.sessions.show',
    component: TheShowSessionPage,
    props: true,
  },
  {
    path: '/client/sessions/:sessionId/join',
    name: 'client.sessions.join',
    component: TheJoinSessionPage,
    props: true,
  },
  {
    path: '/client/sessions/setup',
    name: 'client.sessions.setup',
    component: TheSetupSessionPage,
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router