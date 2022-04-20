import { Player } from './player.entity'

export class Session {
  public id: number
  private players: Player[] = []

  constructor(id: number) {
    this.id = id
  }

  addPlayer(player: Player) {
    if (this.players.length >= 2) {
      return
    }

    this.players.push(player)
  }
}
