import { Player } from '../entities/player.entity'
import UserResource from './user.resource'

export default class PlayerResource {
  private resource: Player

  constructor(resource: Player) {
    this.resource = resource
  }

  public transform(): Object {
    return {
      user: new UserResource(this.resource.user).transform(),
      field: this.resource.field,
      state: this.resource.state,
    }
  }
}