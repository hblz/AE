import React from 'react'
import { Route } from 'react-router-dom'
import { OA_ROLES } from 'utils'

const route = (
  <Route path='tasks' comp='tasks/components/index.async.jsx' roles={ OA_ROLES }>

    <Route path='list' comp='tasks/components/list/index.async.jsx'/>
    <Route path='global' comp='tasks/components/list/indexGlobal.async.jsx'/>
    <Route path='rewards/:id' comp='tasks/components/list/indexRewards.async.jsx'/>
    <Route path='operation(/:id)(/:clone)' comp='tasks/components/operation/index.async.jsx'/>
    <Route path='operationS(/:id)(/:clone)' comp='tasks/components/operation/indexSimple.async.jsx'/>
    <Route path='operationRe/:id(/:reId)' comp='tasks/components/operation/indexRe.async.jsx'/>

    <Route path='activity' comp='tasks/components/activity/index.async.jsx' />
  </Route>
)

export default route
