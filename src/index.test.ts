import Esa from './index'

declare var process : {
  env: {
    TOKEN: string
    TEAM_NAME: string
  }
}

const client = new Esa(process.env.TOKEN, process.env.TEAM_NAME)
client.posts().then(res => {
  console.log(res.posts[0])
})