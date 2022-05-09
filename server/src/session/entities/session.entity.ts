import { Player } from './player.entity'
import { Socket } from 'socket.io'
import PlayerState from '../enums/playerstate.enum'

export class Session {
  public id: number
  public players: Player[] = []
  public watchers: Socket[] = []

  constructor() {
    this.id = this.generateId()
  }

  public addWatcher(socket: Socket): void {
    if (this.watchers.find(watcher => watcher.id === socket.id)) {
      return
    }

    this.watchers.push(socket)
  }

  public addPlayer(player: Player) {
    if (this.players.length >= 2) {
      return
    }

    this.players.push(player)
  }

  public isReady(): boolean {
    return this.players.filter(player => player.state !== PlayerState.JOINED).length === 2
  }

  private generateId(): number {
    return parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(4).toString().replace(".", ""))
  }
}
