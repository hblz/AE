import auth from './auth'
import * as consts from './consts'
import * as helpers from './helpers'
import md5 from './md5'
import REST from './restful'
import Storage from './storage'
import pubsub from './pubsub'
import urlParams from './urlParams'

export default {
  REST,
  auth,
  md5,
  sessionStorage: new Storage(null, -1),
  localStorage: new Storage(),
  pubsub,
  ...consts,
  ...helpers,
  urlParams
}
