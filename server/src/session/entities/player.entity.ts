import { User } from './user.entity'
import Cell from '../enums/cell.enum'
import PlayerState from '../enums/playerstate.enum'
import { Socket } from 'socket.io'

export class Player {
  public user: User
  public field: Cell[][]
  public client: Socket
  public state: PlayerState

  constructor(user: User, client: Socket) {
    this.user = user
    this.client = client

    this.field = this.generate(10)
    this.setState(PlayerState.JOINED)
  }

  private generate(size: number): Cell[][] {
    const field: Cell[][] = [];

    for (let rowIndex = 0; rowIndex < size; rowIndex++) {
      const row = []
      for (let colIndex = 0; colIndex < size; colIndex++) {
        row.push(Cell.EMPTY)
      }
      field.push(row)
    }

    return field
  }

  public setState(state: PlayerState) {
    this.state = state
  }
}
