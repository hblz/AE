import utils from 'utils'
import REST from 'utils/restful'

export default class extends REST {
  constructor () {
    super()
    this.baseUri = [ utils.SIGNOUT_API_ORIGIN, 'v2', 'apis/admin/init/tenant' ]
  }
}
