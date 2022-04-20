import axios from 'axios'

export const sessions = {
  create() {
    return axios.post('/api/sessions')
  }
}