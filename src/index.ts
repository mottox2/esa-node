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

interface CollectionOptions {
  page?: number
  per_page?: number
}

class Esa {
  private client: Client
  private teamName: string

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
}

export default Esa