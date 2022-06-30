import { onBeforeRouteLeave } from 'vue-router'
import { onBeforeUnmount } from 'vue'

export function useBeforeUnload(check: (to, from) => boolean, handler: (to, from) => void) {
  // Native browser support
  function beforeWindowUnload(e: Event): void {
    e.preventDefault()
    e.returnValue = ''
  }

  window.addEventListener('beforeunload', beforeWindowUnload)

  onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', beforeWindowUnload)
  })

  // Vue router support
  onBeforeRouteLeave((to, from) => {
    if (check(to, from)) {
      if (!window.confirm('Do you really want to leave? Your game is not finished yet!')) {
        return false
      }
    }

    handler(to, from)
  })
}