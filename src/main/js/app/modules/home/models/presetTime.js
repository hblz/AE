import utils from 'utils'
import REST from 'utils/restful'

export default class extends REST {
  constructor () {
    super()
    this.baseUri = [ utils.DATE_CONFIG, 'v0.1', 'services' ]
    this.setAuth = false
  }
}
