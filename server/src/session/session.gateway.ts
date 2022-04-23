import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets'
import Cell from './enums/cell.enum'
import { Socket } from 'socket.io'
import { SessionService } from './session.service'
import { Session } from './entities/session.entity'
import { Player } from './entities/player.entity'

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
    const playerResource = {
      player: {
        user: {
          name: player.user.name,
        },
        field: player.field,
      }
    }
    player.client.emit('joined', playerResource)

    const host: Socket = this.sessionService.find(data.sessionId).host
    host.emit('joined', playerResource)
  }

  @SubscribeMessage('setup')
  setup(@MessageBody() data): void {
    const host: Socket = this.sessionService.find(data.sessionId).host
    host.emit('setup', data.field)
  }

  @SubscribeMessage('updated')
  fieldUpdate(@MessageBody() field: Cell[][]): void {
    //
  }
}