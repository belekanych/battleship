import { User } from './user.entity'
import PlayerState from '../enums/playerstate.enum'
import { Socket } from 'socket.io'
import { PlayerPayload } from './playerPayload.entity'

export class Player {
  public id: number
  public user: User
  public client: Socket
  public state: PlayerState
  public payload: PlayerPayload

  constructor(user: User, client: Socket) {
    this.user = user
    this.client = client

    this.id = this.generateId()
    this.payload = new PlayerPayload()
    this.setState(PlayerState.JOINED)
  }

  private generateId(): number {
    return parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(6).toString().replace(".", ""))
  }

  public setState(state: PlayerState) {
    this.state = state
  }
}
