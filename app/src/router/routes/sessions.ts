import TheCreateBotPage from '@/pages/sessions/TheCreateBotPage.vue'
import TheCreateFriendPage from '@/pages/sessions/TheCreateFriendPage.vue'
import TheJoinPage from '@/pages/sessions/TheJoinPage.vue'
import ThePlayPage from '@/pages/sessions/ThePlayPage.vue'
import TheSetupPage from '@/pages/sessions/TheSetupPage.vue'
import TheShowPage from '@/pages/sessions/TheShowPage.vue'

export default [
  {
    path: '/create/bot',
    name: 'create.bot',
    component: TheCreateBotPage,
  },
  {
    path: '/create/friend',
    name: 'create.friend',
    component: TheCreateFriendPage,
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
