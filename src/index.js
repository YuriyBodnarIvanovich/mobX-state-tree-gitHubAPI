import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'mobx-react'
import Store from './store'
import App from './containers/App'

const store = Store.create({
  error: '',
  fetching: false,
  users: []
})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

if (process.env.NODE_ENV !== 'production') {
  require('mobx-logger').enableLogging()
}
