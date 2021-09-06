import {types} from 'mobx-state-tree'

const User = types.model({
  name: types.string,
  login: types.string,
  avatar_url: types.string,
  location: types.maybe(types.string, ''),
  created_at: types.Date ,
  bio: types.maybe(types.string, ''),
  folovers: types.number,
  following: types.number,
  public_repos: types.maybe(types.number, ''),
  twitter_username:types.maybe(types.string, '')
})

const Store = types
  .model({
    error: types.string,
    fetching: types.boolean,
    users: types.array(User),
    theme: types.optional(types.boolean,false),
  })
  .actions(self => {
    function checkAddingAbility (login) {
      const exists = self.users.find(user => user.login === login)

      if (exists) {
        self.error = `${login} already exists`
        return
      }

      self.error = ''
      self.fetching = true
    }

    function addUser (userResponse) {
      console.log(userResponse)
      self.fetching = false
      const userObj = {
        name: userResponse.name,
        login: userResponse.login,
        avatar_url:userResponse.avatar_url,
        location:userResponse.location,
        created_at:Date.parse(userResponse.created_at),
        bio:userResponse.bio,
        folovers:userResponse.followers,
        following:userResponse.following,
        public_repos:userResponse.public_repos,
        twitter_username:userResponse.twitter_username,
      }
      self.users[0] = userObj;
    }

    function handleError (error) {
      self.error = error
    }
    function changeTheme(theme){
        self.theme = theme
    }
    return {
      addUser,
      handleError,
      checkAddingAbility,
      changeTheme
    }
  })

export default Store
