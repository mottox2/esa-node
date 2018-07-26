import axios, { AxiosInstance } from 'axios'

interface Post {
  name: string
}

class Teams {
  async posts() {
    return await axios.get('/posts')
  }
}

class Client {
  private client: AxiosInstance

  constructor(accessToken: string, teamName: string) {
    const baseUrl = `https://api.esa.io/v1/teams/${teamName}`
    this.client = axios.create({
      baseURL: baseUrl
    })
    
    this.client.interceptors.request.use((config) => {
      config.headers.Authorizaion = `Bearer ${accessToken}`
      return config
    })
  }

  get(path: string): Promise<any> {
    return this.client.get(path)
  }
}

class Esa {
  private client: Client;
  private teams: Teams

  constructor(accessToken: string, teamName: string) {
    this.client = new Client(accessToken, teamName)
    this.teams = new Teams()
  }

}

export default Esa