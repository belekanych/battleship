import { Field } from '../types/Field'
import User from './User'

export default class Player {
  public user: User
  public field: Field

  constructor(user: User, field: Field) {
    this.user = user
    this.field = field
  }
}