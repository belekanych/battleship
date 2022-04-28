import UserType from '../types/User'

export default class User {
  public name: string = ''

  constructor({ name }: UserType) {
    this.name = name
  }
}