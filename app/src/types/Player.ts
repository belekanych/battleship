import PlayerState from '@/enums/PlayerState'
import PlayerPayload from './PlayerPayload'
import User from './User'

type Player = {
  id: number
  user: User
  payload: PlayerPayload
  state: PlayerState
}

export default Player
