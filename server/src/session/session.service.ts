import * as QRCode from 'qrcode'
import Cell from './enums/cell.enum'
import PlayerState from './enums/playerstate.enum'
import { Injectable } from '@nestjs/common'
import { Player } from './entities/player.entity'
import { Session } from './entities/session.entity'
import { Socket } from 'socket.io'
import PlayerType from './types/player.type'

@Injectable()
export class SessionService {
  private sessions: Session[] = []

  public create() {
    const session = new Session()

    this.sessions.push(session)

    return session
  }

  public findAll() {
    return this.sessions
  }

  public find(sessionId: number): Session {
    return this.sessions.find(session => session.id === sessionId)
  }

  public async getJoinQrCode(id: number): Promise<string> {
    const url = `http://${process.env.DOMAIN}:${process.env.CLIENT_PORT}/sessions/${id}/join`

    return await QRCode.toDataURL(url)
  }

  public join(sessionId: number, props: PlayerType): Player {
    const player = new Player(props)

    const session = this.find(sessionId)
    session.addPlayer(player)

    return player
  }

  public setup(connectionId: string, field: Cell[][]): Session {
    const session = this.findPlayerSession(connectionId)

    const player = session.players[this.findPlayerIndex(session, connectionId)]
    player.payload.field = field
    player.setState(PlayerState.READY)

    if (session.isReady()) {
      session.players[0].setState(PlayerState.MOVE)
      session.players[1].setState(PlayerState.WAITING)
    }

    return session
  }

  public guess(connectionId: string, row: number, col: number): Session {
    const session = this.findPlayerSession(connectionId)
    const playerIndex = this.findPlayerIndex(session, connectionId)
    const enemyIndex = playerIndex === 0 ? 1 : 0

    const enemy = session.players[enemyIndex]
    enemy.payload.field[row][col] = enemy.payload.field[row][col] === Cell.SHIP ? Cell.HIT : Cell.MISS
    enemy.setState(PlayerState.MOVE)

    const player = session.players[playerIndex]
    player.setState(PlayerState.WAITING)

    return session
  }

  private findPlayerSession(connectionId: string): Session {
    return this.sessions.find(session => {
      return this.findPlayerIndex(session, connectionId) !== -1
    })
  }

  private findPlayerIndex(session: Session, connectionId: string): number {
    return session.players.findIndex(player => player.connectionId === connectionId)
  }
}
