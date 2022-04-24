import { defineStore } from 'pinia'
import { io } from 'socket.io-client'

export const useSocketStore = defineStore('socket', {
  state: () => {
    const scheme = import.meta.env.VITE_SERVER_SCHEME
    const domain = import.meta.env.VITE_SERVER_DOMAIN
    const port = import.meta.env.VITE_SERVER_PORT

    return {
      socket: io(`${scheme}://${domain}:${port}`),
    }
  }
})