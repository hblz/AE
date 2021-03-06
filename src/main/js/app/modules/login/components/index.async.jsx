import './static/styles/_login.scss'

import React from 'react'
import { connect } from 'react-redux'
import i18n from 'i18n'
import PropTypes from 'prop-types'

import QRCode from './qrcode'
import Form from './form'

import actionCreators from '../actions'
import '../reducers'
import '../i18n'

@connect(state => ({
}), actionCreators)
export default class extends React.Component {
  static propTypes = {
    login: PropTypes.func,
    history: PropTypes.object,
    location: PropTypes.object
  }

  constructor () {
    super()
    this.t = i18n.getFixedT(null, 'login')
    this.state = {
    }
  }

  componentDidMount () {
  }

  render () {
    const { t } = this

    return (
      <div className='login-bg'>
        <div className='login-logo'/>
        <div className='login-panel' style={{height: this.state.urlPath ? '400px' : '320px'}}>
          <div ref='loginQRCode' className='login-qrcode'>
            <div className='qrcode'>
              <QRCode/>
              {t('qrcode.open99u')}<br/>{t('qrcode.scan')}
            </div>
          </div>
          <div ref='loginForm' className='login-form'>
            <div className='login-form-title'>{t('login')}</div>
            <Form callBack={this._handleSubmit}/>
          </div>
        </div>
      </div>
    )
  }

  _handleSubmit = formData => {
    this.props.login({
      login_name: formData.name,
      password: formData.password,
      onSuccess: this._onSuccess
    })
  }

  _onSuccess = () => {
    const { location } = this.props
    let nextPath = '/'

    if (location.state && location.state.nextPathname) {
      nextPath = location.state.nextPathname
    }

    if (location.state && location.state.search) {
      nextPath = location.state.nextPathname + location.state.search
    }
    this.props.history.push(nextPath)
  }
}
