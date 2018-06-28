import { handleActions } from 'redux-actions'
import actionTypes from '../constants';

export default handleActions({
  [actionTypes.RECEIVE_CHANNEL]: (state, action) => {
    const { payload, meta } = action;
    switch (meta.step) {
      case 1:
        return {
          ...state,
          qrcode: payload.data,
          userInfo: null,
          token: null
        }
      case 2:
        return {
          ...state,
          userInfo: payload.data,
          token: null
        }
      case 3:
        return {
          ...state,
          token: payload.data
        }
    }
  }
}, {});