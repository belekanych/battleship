import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets'
import { Socket } from 'socket.io'
import { SessionService } from './session.service'
import { Session } from './entities/session.entity'
import { Player } from './entities/player.entity'
import PlayerResource from './resources/player.resource'
import SessionResource from './resources/session.resource'
import Cell from './enums/cell.enum'

@WebSocketGateway({ cors: true })
export class SessionGateway {
  constructor(private readonly sessionService: SessionService) {}

  @SubscribeMessage('create')
  create(@ConnectedSocket() client: Socket): number {
    const session: Session = this.sessionService.create()

    session.addWatcher(client)
    
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

    this.notify(
      session,
      'updated',
    )
  }

  @SubscribeMessage('setup')
  setup(@ConnectedSocket() client: Socket, @MessageBody() field: Cell[][]): void {
    const session: Session = this.sessionService.setup(client.id, field)

    this.notify(
      session,
      'updated',
    )
  }

  @SubscribeMessage('move')
  guess(@ConnectedSocket() client: Socket, @MessageBody() data): void {
    const session: Session = this.sessionService.guess(client.id, +data.row, +data.col)

    this.notify(
      session,
      'updated',
    )
  }

  private notify(session: Session, event: string): void
  {
    const payload = new SessionResource(session).transform()

    session.watchers.forEach((socket: Socket) => {
      socket.emit(event, payload)
    })
  }
}