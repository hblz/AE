import utils from 'utils'
import REST from 'utils/restful'

export default class extends REST {
  constructor () {
    super()
    this.baseUri = [ utils.UC_API_ORIGIN, 'v0.93', 'bearer_tokens' ]
  }
}
