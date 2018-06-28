import { handleActions } from 'redux-actions'
import { appendReducer } from 'store'
import i18n from 'i18n'

import actionTypes from '../constants'
const language = handleActions({
  [actionTypes.CHANGE_LANGUAGE]: (state, action) => {
    i18n.changeLanguage(action.payload);
    return action.payload;
  }
}, 'zh');
export default appendReducer({
  language
})
