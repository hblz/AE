import utils from 'utils'
import REST from 'utils/restful'

export default class extends REST {
  constructor ({ baseUri = utils.CS_API_ORIGIN, version = 'v0.1', api }) {
    super()
    this.baseUri = [ baseUri, version, api ]
  }
}
