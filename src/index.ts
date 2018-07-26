import axios, { AxiosInstance } from 'axios'

interface Post {
  name: string
}

type Client = AxiosInstance

class Teams {
  client: Client

  constructor(client: Client) {
    this.client = client
  }

  async post(postId: string) {
    return this.client.request<Post>({
      method: 'get',
      url: '/'
    })
  }
}

class Esa {
  private client: Client;
  private teams: Teams

  constructor(accessToken: string, teamName: string) {
    const baseUrl = `https://api.esa.io/v1/teams/${teamName}`
    this.client = axios.create({
      baseURL: baseUrl
    })
    
    this.client.interceptors.request.use((config) => {
      config.headers.Authorizaion = `Bearer ${accessToken}`
      return config
    })

    this.teams = new Teams(this.client)
  }
}

export default Esa