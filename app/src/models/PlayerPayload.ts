import Field from './Field'
import Props from '@/types/PlayerPayload'

export default class PlayerPayload {
  public locationMap: Field
  public hitMap: Field

  constructor(payload: Props) {
    this.locationMap = new Field(payload.locationMap)
    this.hitMap = new Field(payload.hitMap)
  }
}
