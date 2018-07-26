import axios, { AxiosInstance } from 'axios'

type Client = AxiosInstance

interface CollectionResponse {
  prev_page: number | null
  next_page: number | null
  total_count: number
  page: number
  per_page: number
  max_per_page: number
}

interface Post {
  number: number
  name: string
  tags: Array<string>
  category: string
  full_name: string
  wip: boolean
  body_md: string
  body_html: string
  created_at: string
  updated_at: string
  message: string
  url: string
  revision_number: number
  created_by: {
    name: string
    screen_name: string
    icon: string
  }
  updated_by: {}
  kind: 'stock' | 'flow'
  comments_count: number
  tasks_count: number
  done_tasks_count: number
  stargazers_count: number
  watchers_count: number
  star: boolean
  watch: boolean
}

interface PostCollection extends CollectionResponse {
  posts: Array<Post>
}

interface Team {
  name: string
  privacy: 'closed' | 'open'
  description: string
  icon: string
  url: string
}

interface TeamsCollection extends CollectionResponse {
  teams: Array<Team>
}

interface Member {
  name: string
  screen_name: string
  icon: string
  email: string
  posts_count: number
}

interface MembersCollection extends CollectionResponse {
  members: Array<Member>
}

interface User {
  id: number
  name: string
  screen_name: string
  created_at: string
  updated_at: string
  icon: string
  email: string
}

interface CollectionOptions {
  page?: number
  per_page?: number
}

class Esa {
  private client: Client
  private teamName?: string

  constructor(accessToken: string, teamName?: string) {
    this.teamName = teamName
    this.client = axios.create({
      baseURL: 'https://api.esa.io/v1'
    })

    this.client.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${accessToken}`
      return config
    })
  }

  setTeam(teamName: string) {
    this.teamName = teamName
  }

  teams(options?: CollectionOptions) {
    return this.client.request<TeamsCollection>({
      method: 'get',
      url: `/teams`,
      params: options,
    }).then(res => res.data)
  }

  team(teamName: string) {
    return this.client.request<Team>({
      method: 'get',
      url: `/teams/${teamName}`,
    }).then(res => res.data)
  }

  members() {
    return this.client.request<MembersCollection>({
      method: 'get',
      url: `/teams/${this.teamName}/members`
    }).then(res => res.data)
  }

  post(postId: string) {
    return this.client.request<Post>({
      method: 'get',
      url: `/teams/${this.teamName}/posts/${postId}`
    }).then(res => res.data)
  }

  posts(options?: CollectionOptions) {
    return this.client.request<PostCollection>({
      method: 'get',
      url: `/teams/${this.teamName}/posts`,
      params: options,
    }).then(res => res.data)
  }

  user() {
    return this.client.request<User>({
      method: 'get',
      url: `/user`,
    }).then(res => res.data)
  }
}

export default Esa