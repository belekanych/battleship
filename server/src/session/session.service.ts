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

  public move(connectionId: string, row: number, col: number): Session {
    const session = this.findPlayerSession(connectionId)
    const playerIndex = this.findPlayerIndex(session, connectionId)
    const enemyIndex = playerIndex === 0 ? 1 : 0

    const enemy = session.players[enemyIndex]
    enemy.setState(PlayerState.MOVE)

    const cell: Cell = enemy.payload.field[row][col]

    if (cell >= Cell.S1 && cell <= Cell.S5) {
      enemy.payload.field[row][col] = Cell.HIT
    } else {
      enemy.payload.field[row][col] = Cell.MISS
    }

    const player = session.players[playerIndex]
    player.setState(PlayerState.WAITING)

    if (session.isCompleted()) {
      session.players.forEach(player => {
        player.setState(player.isLost() ? PlayerState.LOST : PlayerState.WON)
      })
    }

    return session
  }

  public disconnect(connectionId: string): Session | null {
    const session: Session | null = this.findWatcherSession(connectionId)

    if (!session) {
      return null
    }

    session.removeWatcher(connectionId)

    const player: Player | null = session.players.find(player => player.connectionId === connectionId)
    if (player) {
      session.removePlayer(player)
    }

    return session
  }

  public findWatcherSession(connectionId: string): Session | null {
    return this.sessions.find(session => session.watchers.find(watcher => watcher.id === connectionId))
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
