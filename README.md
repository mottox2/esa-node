
```js
import Esa from 'node-esa'

const esa = new Esa('access_token', 'teamName')

// Fetch posts
const res = await esa.posts()
console.log(res.posts)

// Change team
const teamResponse = await esa.teams()
esa.setTeam(teamResponse.teams[1].name)
const posts = esa.posts()
```