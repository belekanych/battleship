import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets'
import { Socket } from 'socket.io'
import { SessionService } from './session.service'
import { Session } from './entities/session.entity'
import { Player } from './entities/player.entity'
import PlayerResource from './resources/player.resource'
import SessionResource from './resources/session.resource'
import Cell from './enums/cell.enum'

@WebSocketGateway({ cors: true })
export class SessionGateway {
  @WebSocketServer()
  server

  constructor(private readonly sessionService: SessionService) {}

  @SubscribeMessage('create')
  create(@ConnectedSocket() client: Socket): number {
    const session: Session = this.sessionService.create(client)
    
    return session.id
  }

  @SubscribeMessage('join')
  join(@ConnectedSocket() client: Socket, @MessageBody() data: { sessionId: number, name: string }): void {
    const player: Player = this.sessionService.join(data.sessionId, data.name, client)

    const playerResource = new PlayerResource(player).transform()
    player.client.emit('joined', playerResource)

    const host: Socket = this.sessionService.find(data.sessionId).host
    host.emit('joined', playerResource)
  }

  @SubscribeMessage('setup')
  setup(@ConnectedSocket() client: Socket, @MessageBody() field: Cell[][]): void {
    const session: Session = this.sessionService.setup(client, field)
    const host: Socket = session.host
    host.emit('setup', new SessionResource(session).transform())

    if (session.isReady()) {
      host.emit('ready')

      session.players[0].client.emit(
        'ready',
        new PlayerResource(session.players[1]).transform()
      )

      session.players[1].client.emit(
        'ready',
        new PlayerResource(session.players[0]).transform()
      )
    }
  }
}