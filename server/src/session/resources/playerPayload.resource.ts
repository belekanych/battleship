import Field from './field.resource'
import { PlayerPayload } from '../entities/playerPayload.entity'

export default class PlayerResource {
  private resource: PlayerPayload

  constructor(resource: PlayerPayload) {
    this.resource = resource
  }

  public transform(): Object {
    return {
      locationMap: new Field(this.resource.locationMap).transform(),
      hitMap: new Field(this.resource.hitMap).transform(),
    }
  }
}