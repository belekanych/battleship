import { defineStore } from 'pinia'
import Player from '../models/Player'
import Session from '../models/Session'

export const useSessionStore = defineStore('session', {
  state: () => {
    return {
      session: new Session()
    }
  }
})