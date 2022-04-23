import { defineStore } from 'pinia'
import Player from '../models/Player'

export const useSessionStore = defineStore('session', {
  state: () => {
    return {
      sessionId: 0,
      player: {} as Player,
    }
  }
})