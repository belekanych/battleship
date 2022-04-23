import axios from 'axios'
import Player from '../models/Player'
import User from '../models/User'
import Field from '../types/Field'

export const sessions = {
  create() {
    return axios.post('/api/sessions')
  },

  join(sessionId: number, name: string): Promise<{ data: { user: User, field: Field } }> {
    return axios.post(`/api/sessions/${sessionId}/join`)
  },

  getJoinQrCode(sessionId: number): Promise<{ data: string }> {
    return axios.get(`/api/sessions/${sessionId}/join/qr-code`)
  },
}