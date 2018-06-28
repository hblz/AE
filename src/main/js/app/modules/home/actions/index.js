import { createAction } from 'redux-actions'
import actionTypes from '../constants'

export const changeLanguage = createAction(
  actionTypes.CHANGE_LANGUAGE,
  lng => lng
)
