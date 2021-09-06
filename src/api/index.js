import fetch from 'isomorphic-fetch'

export default function api (endpoint) {
  return fetch(`https://api.github.com/${endpoint}`)
    .then(response => response.json())
    .then(response => {
      const {error} = response

      if (error) {
        return Promise.reject(error)
      }
      return response
    })
}
