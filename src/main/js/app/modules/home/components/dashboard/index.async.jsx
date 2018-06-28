import './static/styles/index.scss'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import i18n from 'i18n'

@connect(state => ({
}))
export default class extends Component {
  static propTypes = {
    history: PropTypes.object
  }
  constructor () {
    super()
    this.t = i18n.getFixedT(null, 'home')
  }

  render () {
    return (
      <div className='index'>
        <div className='no-authority'>
          {this.t('welcome')}
        </div>
      </div>
    )
  }
}
