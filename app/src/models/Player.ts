import Field from '../types/Field'
import PlayerPayload from './PlayerPayload'
import PlayerState from '../enums/PlayerState'
import Props from '../types/Player'
import User from './User'

export default class Player {
  public id: number
  public payload: PlayerPayload
  public state: PlayerState = PlayerState.JOINED
  public user: User

  constructor({ id, user, payload, state }: Props) {
    this.id = id
    this.user = new User(user)
    this.payload = new PlayerPayload(payload)

    this.setState(state)
  }

  public setPayload(payload: PlayerPayload) {
    this.payload = payload
  }

  public setState(state: PlayerState): void {
    this.state = state
  }
}
