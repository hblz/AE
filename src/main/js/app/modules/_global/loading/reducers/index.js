import { handleActions } from 'redux-actions'
import { appendReducer } from 'store'

const RECEIVE_LOADING_STATE = 'RECEIVE_LOADING_STATE';

const isLoading = handleActions({
  [RECEIVE_LOADING_STATE]: (state, action) => action.payload
}, false);

export default appendReducer({
  isLoading
})
