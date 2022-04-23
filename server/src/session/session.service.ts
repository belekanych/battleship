import { Injectable } from '@nestjs/common'
import { Player } from './entities/player.entity'
import { Session } from './entities/session.entity'
import { User } from './entities/user.entity'
import * as QRCode from 'qrcode'
import { Socket } from 'socket.io'

@Injectable()
export class SessionService {
  private sessions: Session[] = []

  create(host: Socket) {
    const session = new Session(host)

    this.sessions.push(session)

    return session
  }

  findAll() {
    return this.sessions
  }

  find(sessionId: number): Session {
    return this.sessions.find(session => session.id === sessionId)
  }

  async getJoinQrCode(id: number): Promise<string> {
    const url = `http://192.168.0.105:3000/client/sessions/${id}/join`

    return await QRCode.toDataURL(url)
  }

  join(sessionId: number, name: string, client: Socket): Player {
    const session = this.find(sessionId)

    const player = new Player(new User(name), client)

    session.addPlayer(player)

    return player
  }
}
