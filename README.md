## esa-node

[![npm version](https://badge.fury.io/js/esa-node.svg)](https://badge.fury.io/js/esa-node)

esa.io API v1 client library for nodejs.


## Installation

via npm

```
$ npm install --save esa-node
```

via yarn
```
$ yarn add esa-node
```

## Supported methods
- teams
- team
- members
- posts
- post(post_number)
- create_post
- comments
- comment
- invitation
- user

## Example

```js
// Setup
import Esa from 'esa-node'
const esa = new Esa('access_token', 'teamName')

// Fetch posts
const res = await esa.posts()
console.log(res.posts)

// Change team
const teamResponse = await esa.teams()
esa.setTeam(teamResponse.teams[1].name)
const posts = esa.posts()
```

## Contributing
1. Fork it ( https://github.com/mottox2/esa-node/fork )
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create a new Pull Request

## Links
- [dev/esa/api/v1 docs.esa.io](https://docs.esa.io/posts/102)
