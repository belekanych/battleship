import axios from 'axios'

export const sessions = {
  create() {
    return axios.post('/api/sessions')
  },

  getJoinQrCode(sessionId: number): Promise<string> {
    return axios.get(`/api/sessions/${sessionId}/join/qr-code`)
  },
}