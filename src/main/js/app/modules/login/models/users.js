import utils, { REST } from 'utils'

export default class extends REST {
  constructor() {
    super();
    this.baseUri = [utils.UC_API_ORIGIN,'v0.93','users/{user_id}'];
  }
}
