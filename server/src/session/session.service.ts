import { Injectable } from '@nestjs/common'
import { Player } from './entities/player.entity'
import { Session } from './entities/session.entity'
import { User } from './entities/user.entity'

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
