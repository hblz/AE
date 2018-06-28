import React, { Component } from 'react'
import { Router, Route, Switch, withRouter } from 'react-router-dom'
import createHashHistory from 'history/createHashHistory'
import withAuth, { logout, goHomeIfLoggedIn } from 'utils/routes'

import Root from 'root.jsx'
import Home from 'modules/home/components'
import Dashboard from 'modules/home/components/dashboard'
import Login from 'modules/login/components'
import Access from 'modules/_global/error/403/components'
import NotFind from 'modules/_global/error/404/components'
// import Tasks from './tasks'
const RootT = withRouter(Root)
const routes = (
  <RootT>
    <Switch>
      <Route path='/login' component={Login}/>
      <Route path='/logout' onEnter={logout} />
      {/* <Route exact path='/' component={Home} /> */}
      <Home>
        <Route exact path='/' component={Dashboard}/>
        <Route path='/index' component={Dashboard}/>
        <Route path='/403' component={Access}/>
        <Route path='/404' component={NotFind}/>
      </Home>
    </Switch>
  </RootT>
)
export default class extends Component {
  render () {
    return (
      <Router history={createHashHistory()}>
        {routes}
      </Router>
    )
  }
}
