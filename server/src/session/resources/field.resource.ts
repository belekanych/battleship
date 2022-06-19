import { Field } from '../entities/field.entity'

export default class FieldResource {
  private resource: Field

  constructor(resource: Field) {
    this.resource = resource
  }

  public transform(): Object {
    return {
      rows: this.resource.rows,
    }
  }
}