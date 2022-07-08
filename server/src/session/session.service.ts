import * as QRCode from 'qrcode'
import Cell from './enums/cell.enum'
import Difficulty from './enums/difficulty.enum'
import PlayerState from './enums/playerstate.enum'
import PlayerType from './types/player.type'
import { BotInterface } from './bots/bot.interface'
import { Easy } from './bots/easy.bot'
import { Hard } from './bots/hard.bot'
import { Injectable } from '@nestjs/common'
import { Normal } from './bots/normal.bot'
import { Player } from './entities/player.entity'
import { Session } from './entities/session.entity'
import { Base } from './bots/base.bot'
import Move from './types/move.type'

@Injectable()
export class SessionService {
  private sessions: Session[] = []

  public create(): Session {
    const session = new Session()

    this.sessions.push(session)

    return session
  }

  public addBot(session: Session, difficulty: Difficulty): void {
    let bot: BotInterface = null

    const playerProps: PlayerType = {
      name: 'Bot',
      connectionId: 'bot' + Math.ceil(Math.random() * Date.now()).toPrecision(4).toString(),
    }

    switch (difficulty) {
      case Difficulty.EASY:
        bot = new Easy(playerProps)
        break
      case Difficulty.NORMAL:
        bot = new Normal(playerProps)
        break
      case Difficulty.HARD:
        bot = new Hard(playerProps)
        break
    }

    session.addPlayer(bot)

    this.setup(playerProps.connectionId, bot.payload.locationMap.rows)
  }

  private getRandom(max: number): number {
    return Math.floor(Math.random() * max)
  }

  public findAll() {
    return this.sessions
  }

  public find(sessionId: number): Session {
    return this.sessions.find(session => session.id === sessionId)
  }

  public async getJoinQrCode(id: number): Promise<string> {
    const url = `http://${process.env.DOMAIN}:${process.env.CLIENT_PORT}/sessions/${id}/play`

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
    player.payload.locationMap.rows = field
    player.setState(PlayerState.READY)

    if (session.isReady()) {
      session.players[0].setState(PlayerState.MOVE)
      session.players[1].setState(PlayerState.WAITING)
    }

    return session
  }

  public move(connectionId: string, row: number, col: number): Session {
    const session: Session = this.findPlayerSession(connectionId)

    const enemy: Player = this.getEnemy(session, connectionId)
    enemy.setState(PlayerState.MOVE)

    const player: Player = this.getPlayer(session, connectionId)
    player.setState(PlayerState.WAITING)

    const cell: Cell = enemy.payload.locationMap.rows[row][col]

    if (cell >= Cell.S1 && cell <= Cell.S5) {
      enemy.payload.hitMap.rows[row][col] = Cell.HIT

      if (enemy.payload.isAllHit(cell)) {
        enemy.payload.setDestroyed(cell)
      }
    } else {
      enemy.payload.hitMap.rows[row][col] = Cell.MISS
    }

    if (session.isCompleted()) {
      session.players.forEach(player => {
        player.setState(player.isLost() ? PlayerState.LOST : PlayerState.WON)
      })
    }

    return session
  }

  public moveBot(session: Session): void {
    const bot: BotInterface = session.players.find(player => player instanceof Base)

    if (!bot || bot.isLost() || !session.isReady()) {
      return
    }

    const enemy: Player = this.getEnemy(session, bot.connectionId)
    const move: Move = bot.getNextMove(enemy.payload.hitMap)

    this.move(bot.connectionId, move.row, move.col)
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

  public restart(session: Session): void {
    session.players.forEach((player: Player) => {
      player.reset()
    })

    session.players.forEach((player: Player) => {
      if (player instanceof Base) {
        this.setup(player.connectionId, player.payload.locationMap.rows)
      }
    })
  }

  public findWatcherSession(connectionId: string): Session | null {
    return this.sessions.find(session => session.watchers.find(watcher => watcher.id === connectionId))
  }

  public findPlayerSession(connectionId: string): Session {
    return this.sessions.find(session => {
      return this.findPlayerIndex(session, connectionId) !== -1
    })
  }

  private getPlayer(session: Session, connectionId: string): Player {
    return session.players[this.findPlayerIndex(session, connectionId)]
  }

  private getEnemy(session: Session, connectionId: string): Player {
    const playerIndex: number = this.findPlayerIndex(session, connectionId)

    return session.players[playerIndex === 0 ? 1 : 0]
  }

  private findPlayerIndex(session: Session, connectionId: string): number {
    return session.players.findIndex(player => player.connectionId === connectionId)
  }
}
