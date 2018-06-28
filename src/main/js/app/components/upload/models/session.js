import REST from 'utils/restful'
import utils from 'utils'

export default class extends REST {
  constructor ({ baseUri = utils.SPRITE_API_ORIGIN, version = 'v1.0', api }) {
    super()
    this.baseUri = [baseUri, version, api]
  }
}
