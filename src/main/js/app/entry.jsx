import 'static/styles/ant/index.less'
import 'static/styles/app.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from 'store'
import Router from 'routes'

require('es6-promise').polyfill() // used for axios
ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>
  , document.getElementById('app')
)
