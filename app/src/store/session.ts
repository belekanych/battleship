import { defineStore } from 'pinia'
import Player from '../models/Player'
import Session from '../models/Session'

export const useSessionStore = defineStore('session', {
  state: () => {
    return {
      session: new Session()
    }
  },
  getters: {
    player: ({ session }): Player => session.players[0],
    enemy: ({ session }): Player => session.players[1],
  },
})