import React, { Component } from 'react'
import i18n from 'i18n'

import '../../static/styles/common.scss'

export default class extends Component {

  // constructor(props, context) {
  //   super(props, context)
  // }

  render () {
    return (
      <div className='error-container'>
        <div className='error-pic'></div>
        <div className='error-text'>{i18n.t('notAccess')}</div>
      </div>
    )
  }

}
