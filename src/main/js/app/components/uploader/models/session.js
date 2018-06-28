import utils from 'utils'
import REST from 'utils/restful'

export default class extends REST {
  constructor(api) {
    super()
    this.baseUri = [api]
  }
}
