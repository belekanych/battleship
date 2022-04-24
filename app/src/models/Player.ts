import Field from '../types/Field'
import User from './User'
import PlayerState from '../enums/PlayerState'

export default class Player {
  public user: User
  public field: Field
  public state: PlayerState

  constructor(user: User, field: Field) {
    this.user = user
    this.field = field
    this.setState(PlayerState.JOINED)
  }

  public setState(state: PlayerState): void {
    this.state = state
  }
}