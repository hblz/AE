import { createAction } from 'redux-actions'
import actionTypes from '../constants'

export const login = createAction(
  actionTypes.RECEIVE_TOKENS,
  options => Promise.resolve(options),
  options => ({
    success: {
      handler: res => {
        options.onSuccess(res)
      }
    },
    error: {
      handler: options.onError
    }
  })
)
