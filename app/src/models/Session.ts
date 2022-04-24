import Player from './Player'

export default class Session {
  public id: number = null
  public players: Player[] = []

  public addPlayer(player: Player) {
    this.players.push(player)
  }
}