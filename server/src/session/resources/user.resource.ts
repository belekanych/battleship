import { User } from '../entities/user.entity'

export default class UserResource {
  private resource: User

  constructor(resource: User) {
    this.resource = resource
  }

  public transform(): Object {
    return {
      name: this.resource.name,
    }
  }
}