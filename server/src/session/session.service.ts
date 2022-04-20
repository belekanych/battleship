import { Injectable } from '@nestjs/common'
import { Player } from './entities/player.entity'
import { Session } from './entities/session.entity'
import { User } from './entities/user.entity'
import * as QRCode from 'qrcode'

@Injectable()
export class SessionService {
  private sessions: Session[] = []

  create() {
    const session = new Session(Math.floor(Math.random()*10000))

    this.sessions.push(session)

    return session
  }

  findAll() {
    return this.sessions
  }

  async getJoinQrCode(id: number): Promise<string> {
    const url = `http://192.168.0.105:3000/sessions/${id}/join`

    return await QRCode.toDataURL(url)
  }

  join(id: number) {
    const session = this.sessions.find(session => session.id === id)

    if (!session) {
      return
    }

    const player = new Player(new User('Test'))

    session.addPlayer(player)

    return player
  }
}
