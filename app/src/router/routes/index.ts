import sessions from './sessions'
import TheHomePage from '@/pages/TheHomePage.vue'

export default [
  {
    path: '/',
    name: 'home',
    component: TheHomePage,
  },
  ...sessions,
]
