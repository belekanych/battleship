import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway
} from '@nestjs/websockets'
import Cell from './enums/cell.enum'
import Difficulty from './enums/difficulty.enum'
import Move from './types/move.type'
import PlayerResource from './resources/player.resource'
import SessionResource from './resources/session.resource'
import { Player } from './entities/player.entity'
import { Session } from './entities/session.entity'
import { SessionService } from './session.service'
import { Socket } from 'socket.io'

@WebSocketGateway({ cors: true })
export class SessionGateway implements OnGatewayDisconnect {
  constructor(private readonly sessionService: SessionService) {}

  @SubscribeMessage('create.friend')
  createFriend(@ConnectedSocket() client: Socket): number {
    const session: Session = this.sessionService.create()

    session.addWatcher(client)
    
    return session.id
  }

  @SubscribeMessage('create.bot')
  createBot(@MessageBody() difficulty: Difficulty): number {
    const session: Session = this.sessionService.create()
    
    this.sessionService.addBot(session, +difficulty)

    return session.id
  }

  @SubscribeMessage('view')
  public view(@ConnectedSocket() client: Socket, @MessageBody() sessionId: number): void {
    const session: Session = this.sessionService.find(+sessionId)

    session.addWatcher(client)

    client.emit('updated', new SessionResource(session).transform())
  }

  @SubscribeMessage('join')
  join(@ConnectedSocket() client: Socket, @MessageBody() data: { sessionId: number, name: string }): void {
    const player: Player = this.sessionService.join(data.sessionId, {
      name: data.name,
      connectionId: client.id,
    })
    client.emit('joined', new PlayerResource(player).transform())

    const session: Session = this.sessionService.find(data.sessionId)

    session.addWatcher(client)

    this.notify(session, 'updated')
  }

  @SubscribeMessage('setup')
  setup(@ConnectedSocket() client: Socket, @MessageBody() field: Cell[][]): void {
    const session: Session = this.sessionService.setup(client.id, field)

    this.notify(session, 'updated')

    this.handleBot(session)
  }

  @SubscribeMessage('move')
  move(@ConnectedSocket() client: Socket, @MessageBody() move: Move): void {
    const session: Session = this.sessionService.move(client.id, +move.row, +move.col)

    this.notify(session, 'updated')

    this.handleBot(session)
  }

  @SubscribeMessage('retry')
  public retry(@ConnectedSocket() client: Socket): void {
    const session: Session = this.sessionService.findPlayerSession(client.id)

    this.sessionService.retry(session)

    this.notify(session, 'updated')
    this.notify(session, 'reset')
  }

  public handleDisconnect(client: Socket): void {
    const session: Session | null = this.sessionService.disconnect(client.id)

    if (!session) {
      return
    }

    if (session.players.length < 2) {
      this.notify(session, 'updated')
    }
  }

  private notify(session: Session, event: string): void {
    const payload = new SessionResource(session).transform()

    session.watchers.forEach((socket: Socket) => {
      socket.emit(event, payload)
    })
  }

  private handleBot(session: Session): void
  {
    setTimeout(() => {
      this.sessionService.moveBot(session)

      this.notify(session, 'updated')
    }, 500)
  }
}