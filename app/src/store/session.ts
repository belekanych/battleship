import Player from '@/models/Player'
import Session from '@/models/Session'
import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', {
  state: () => {
    return {
      session: new Session({ id: 0, players: [] }),
    }
  },
  getters: {
    player: ({ session }): Player => session.players[0],
    enemy: ({ session }): Player => session.players[1],
  },
})
