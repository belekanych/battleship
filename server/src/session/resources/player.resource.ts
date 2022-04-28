import PlayerPayload from './playerPayload.resource'
import UserResource from './user.resource'
import { Player } from '../entities/player.entity'

export default class PlayerResource {
  private resource: Player

  constructor(resource: Player) {
    this.resource = resource
  }

  public transform(): Object {
    return {
      id: this.resource.id,
      user: new UserResource(this.resource.user).transform(),
      payload: new PlayerPayload(this.resource.payload).transform(),
      state: this.resource.state,
    }
  }
}