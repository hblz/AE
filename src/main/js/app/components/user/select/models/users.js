import utils from 'utils'
import REST from 'utils/restful'

export default class extends REST {
  constructor() {
    super()
    // this.baseUri = [utils.UC_API_ORIGIN, 'v0.93', 'organizations/{org_id}/orgnodes/{node_id}/users/actions/search']
  }
}
