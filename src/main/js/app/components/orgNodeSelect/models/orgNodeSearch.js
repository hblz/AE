import REST from 'utils/restful';
import utils from 'utils';

export default class extends REST {
  constructor() {
    super();
    // this.baseUri = [utils.UC_API_ORIGIN,'v0.93','organizations/{org_id}/orgnodes/{node_id}/actions/search'];
  }
}
