import REST from 'utils/restful'
import utils from 'utils'

export default class extends REST {
  constructor ({ baseUri = utils.CS_API_ORIGIN, version = 'v1.8', api }) {
    super()
    this.baseUri = [baseUri, version, api]
  }
}
