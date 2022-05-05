import Player from '@/models/Player'
import Session from '@/models/Session'
import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', {
  state: () => {
    return {
      session: new Session({ id: 0, players: [] }),
      playerId: null as number | null,
    }
  },
  getters: {
    player: (state): Player => {
      return state.session.players.filter(
        (player) => player.id === state.playerId
      )[0]
    },
    enemy: (state): Player => {
      return state.session.players.filter(
        (player) => player.id !== state.playerId
      )[0]
    },
  },
})
