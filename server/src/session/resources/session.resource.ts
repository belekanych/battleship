import { Session } from '../entities/session.entity'
import PlayerResource from './player.resource'

export default class SessionResource {
  private resource: Session

  constructor(resource: Session) {
    this.resource = resource
  }

  public transform(): Object {
    return {
      id: this.resource.id,
      players: this.resource.players.map(player => {
        return new PlayerResource(player).transform()
      })
    }
  }
}