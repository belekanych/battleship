import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import Cell from './enums/cell.enum'

@WebSocketGateway({ cors: true })
export class SessionGateway {
  @WebSocketServer()
  server

  @SubscribeMessage('updated')
  fieldUpdate(@MessageBody() field: Cell[][]): void {
    this.server.emit('updated', field)
  }
}