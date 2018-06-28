import { handleActions } from 'redux-actions'
import { appendReducer } from 'store'

const RECEIVE_GLOBAL_MESSAGE = 'RECEIVE_GLOBAL_MESSAGE';

// globalMessage reducer
const globalMessage = handleActions({
  [RECEIVE_GLOBAL_MESSAGE]: (state, action) => action.payload
}, {});

/*
 * another usage
 *
const globalMessage = handleActions({
  [RECEIVE_GLOBAL_MESSAGE]: {
    next(state, action) { return {} },
    throw(state, action){ return {} } // _fluxStandardAction.isError(action) means action.error == true
  }
}, {});
*/

export default appendReducer({
  globalMessage
})
