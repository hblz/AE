import { createStore, applyMiddleware, combineReducers } from 'redux'

import logger from 'redux-logger'
import async from './middlewares/async'

let middlewares = [async.genesis, async.trader, async.terminator]
let finalCreateStore = applyMiddleware(...middlewares)(createStore)

if (__DEBUG__) {
  finalCreateStore = applyMiddleware(...middlewares, logger())(createStore)
}

let reducers = {}
let reducer = () => {}

let store = finalCreateStore(reducer)

export function appendReducer (newReducer) {
  reducers = {...reducers, ...newReducer}

  store.replaceReducer(combineReducers(reducers))

  return store
}

export default store
