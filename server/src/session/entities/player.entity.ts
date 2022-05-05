import PlayerState from '../enums/playerstate.enum'
import { PlayerPayload } from './playerPayload.entity'
import { User } from './user.entity'
import PlayerType from '../types/player.type'

export class Player {
  public connectionId: string
  public id: number
  public payload: PlayerPayload
  public state: PlayerState
  public user: User

  constructor({ name, connectionId}: PlayerType) {
    this.connectionId = connectionId
    this.id = this.generateId()

    this.payload = new PlayerPayload()
    this.user = new User(name)

    this.setState(PlayerState.JOINED)
  }

  private generateId(): number {
    return parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(6).toString().replace(".", ""))
  }

  public setState(state: PlayerState) {
    this.state = state
  }
}
