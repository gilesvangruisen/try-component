import React from 'react'
import ReactDOM from 'react-dom'

import App from './app'
import { tryComponentFactory } from '../'

const tryComponent = tryComponentFactory((err, context) => {
  console.log(err, context)
})

const TryApp = tryComponent(App)

ReactDOM.render(<TryApp beep='boop' />, document.getElementById('main'))
