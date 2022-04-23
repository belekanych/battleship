import { defineStore } from 'pinia'
import { io } from 'socket.io-client'

export const useSocketStore = defineStore('socket', {
  state: () => {
    return {
      socket: io('http://192.168.0.105:3001'),
    }
  }
})