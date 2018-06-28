import utils from 'utils'
import REST from 'utils/restful'

export default class extends REST {
  constructor(path) {
    super()
    this.baseUri = [utils.CS_API_ORIGIN, 'v0.1', path]
  }
}
