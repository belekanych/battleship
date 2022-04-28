import { PlayerPayload } from '../entities/playerPayload.entity'

export default class PlayerResource {
  private resource: PlayerPayload

  constructor(resource: PlayerPayload) {
    this.resource = resource
  }

  public transform(): Object {
    return {
      field: this.resource.field,
    }
  }
}