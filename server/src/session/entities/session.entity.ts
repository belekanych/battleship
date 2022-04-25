import { Player } from './player.entity'
import { Socket } from 'socket.io'
import PlayerState from '../enums/playerstate.enum'

export class Session {
  public id: number
  public players: Player[] = []
  public host: Socket

  constructor(host: Socket) {
    this.id = Math.floor(Math.random()*10000)
    this.host = host
  }

  addPlayer(player: Player) {
    if (this.players.length >= 2) {
      return
    }

    this.players.push(player)
  }

  isReady(): boolean {
    return this.players.filter(player => player.state !== PlayerState.JOINED).length === 2
  }
}
