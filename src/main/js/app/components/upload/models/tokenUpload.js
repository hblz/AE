import REST from 'utils/restful'
import utils from 'utils'

export default class extends REST {
  constructor ({ baseUri = utils.CS_API_ORIGIN, version = 'v0.1', api }) {
    super([], true, false)
    this.baseUri = [baseUri, version, api]
  }
}
