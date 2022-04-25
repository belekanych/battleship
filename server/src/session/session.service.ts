import { Injectable } from '@nestjs/common'
import { Player } from './entities/player.entity'
import { Session } from './entities/session.entity'
import { User } from './entities/user.entity'
import * as QRCode from 'qrcode'
import { Socket } from 'socket.io'
import Cell from './enums/cell.enum'
import PlayerState from './enums/playerstate.enum'

@Injectable()
export class SessionService {
  private sessions: Session[] = []

  public create(host: Socket) {
    const session = new Session(host)

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
    const url = `http://${process.env.DOMAIN}:${process.env.CLIENT_PORT}/client/sessions/${id}/join`

    return await QRCode.toDataURL(url)
  }

  public join(sessionId: number, name: string, client: Socket): Player {
    const session = this.find(sessionId)

    const player = new Player(new User(name), client)

    session.addPlayer(player)

    return player
  }

  public setup(client: Socket, field: Cell[][]): Session {
    const session = this.findClientSession(client)

    const player = session.players[this.findClientPlayerIndex(session, client)]
    player.field = field
    player.setState(PlayerState.READY)

    if (session.isReady()) {
      session.players[0].setState(PlayerState.MOVE)
      session.players[1].setState(PlayerState.WAITING)
    }

    return session
  }

  public guess(client: Socket, row: number, col: number): Session {
    const session = this.findClientSession(client)
    const playerIndex = this.findClientPlayerIndex(session, client)
    const enemyIndex = playerIndex === 0 ? 1 : 0

    const enemy = session.players[enemyIndex]
    enemy.field[row][col] = enemy.field[row][col] === Cell.SHIP ? Cell.HIT : Cell.MISS
    enemy.setState(PlayerState.MOVE)

    const player = session.players[playerIndex]
    player.setState(PlayerState.WAITING)

    return session
  }

  private findClientSession(client: Socket): Session {
    return this.sessions.find(session => {
      return this.findClientPlayerIndex(session, client) !== -1
    })
  }

  private findClientPlayerIndex(session: Session, client: Socket): number {
    return session.players.findIndex(player => {
      return player.client.id === client.id
    })
  }
}
