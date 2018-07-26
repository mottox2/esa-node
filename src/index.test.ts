import Esa from './index'

const client = new Esa(process.env.TOKEN, process.env.TEAM_NAME)
client.posts().then(res => {
  console.log(res.posts[0])
})