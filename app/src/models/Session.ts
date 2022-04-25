import Player from './Player'
import PlayerState from '../enums/PlayerState'

export default class Session {
  public id: number = null
  public players: Player[] = []

  public addPlayer(player: Player) {
    this.players.push(player)
  }

  public isReady(): boolean {
    return this.players.filter(player => player.state !== PlayerState.JOINED).length === 2
  }
}