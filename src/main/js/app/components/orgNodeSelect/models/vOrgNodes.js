import REST from 'utils/restful'
import utils from 'utils'

export default class extends REST {
  constructor () {
    super()
    // this.baseUri = [utils.VORG_API_ORIGIN, 'v0.1', 'virtual_organizations/{v_org_id}/organizations/{org_id}/childorgs'];
  }
}
