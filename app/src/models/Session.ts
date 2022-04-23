import Player from './Player'

export default class Session {
  public sessionId: number
  public players: Player[] = []

  constructor(sessionId: number) {
    this.sessionId = sessionId
  }
}