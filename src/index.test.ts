import Esa from './index'

const esa = new Esa(process.env.TOKEN, process.env.TEAM_NAME)
esa.posts().then(res => {
  console.log(res.posts[0])
})