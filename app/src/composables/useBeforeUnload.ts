import { onBeforeRouteLeave } from 'vue-router'
// import { onBeforeUnmount } from 'vue'

export function useBeforeUnload() {
  // Native browser support
  // function beforeWindowUnload(e: Event): void {
  //   e.preventDefault()
  //   e.returnValue = ' '
  // }

  // window.addEventListener('beforeunload', beforeWindowUnload)

  // onBeforeUnmount(() => {
  //   window.removeEventListener('beforeunload', beforeWindowUnload)
  // })

  // Vue router support
  onBeforeRouteLeave(() => {
    if (!window.confirm('Do you really want to leave? Your game is not finished yet!')) {
      return false
    }
  })
}