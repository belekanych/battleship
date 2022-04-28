import Player from './Player'
import PlayerState from '../enums/PlayerState'
import Props from '@/types/Session'

export default class Session {
  public id: number
  public players: Player[] = []

  constructor({ id, players }: Props) {
    this.id = id
    this.players = (players || []).map((player) => new Player(player))
  }

  public addPlayer(player: Player) {
    this.players.push(player)
  }

  public isReady(): boolean {
    return (
      this.players.filter((player) => player.state !== PlayerState.JOINED)
        .length === 2
    )
  }
}
