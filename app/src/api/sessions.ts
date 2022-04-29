import axios from 'axios'

export const sessions = {
  getJoinQrCode(sessionId: number): Promise<{ data: string }> {
    return axios.get(`/api/sessions/${sessionId}/join/qr-code`)
  },
}
