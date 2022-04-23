import { Player } from './player.entity'
import { Socket } from 'socket.io'

export class Session {
  public id: number
  private players: Player[] = []
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
}
