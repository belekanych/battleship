import Move from '../types/move.type'
import PlayerState from '../enums/playerstate.enum'
import PlayerType from '../types/player.type'
import { Field } from '../entities/field.entity'
import { PlayerPayload } from './playerPayload.entity'
import { User } from './user.entity'

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

  public isLost(): boolean {
    if (this.state === PlayerState.LOST) {
      return true
    }

    if ([PlayerState.WAITING, PlayerState.MOVE].includes(this.state)) {
      return this.payload.isLost()
    }

    return false
  }

  public getNextMove(field: Field): Move {
    return {
      row: 0,
      col: 0,
    }
  }
}
