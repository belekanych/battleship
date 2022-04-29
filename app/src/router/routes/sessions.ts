import TheCreatePage from '@/pages/sessions/TheCreatePage.vue'
import TheJoinPage from '@/pages/sessions/TheJoinPage.vue'
import ThePlayPage from '@/pages/sessions/ThePlayPage.vue'
import TheSetupPage from '@/pages/sessions/TheSetupPage.vue'
import TheShowPage from '@/pages/sessions/TheShowPage.vue'

export default [
  {
    path: '/create',
    name: 'create',
    component: TheCreatePage,
  },
  {
    path: '/:sessionId',
    name: 'show',
    component: TheShowPage,
    props: true,
  },
  {
    path: '/:sessionId/join',
    name: 'join',
    component: TheJoinPage,
    props: true,
  },
  {
    path: '/setup',
    name: 'setup',
    component: TheSetupPage,
  },
  {
    path: '/play',
    name: 'play',
    component: ThePlayPage,
  },
].map((route) => {
  return {
    ...route,
    path: `/sessions${route.path}`,
    name: `sessions.${route.name}`,
  }
})
