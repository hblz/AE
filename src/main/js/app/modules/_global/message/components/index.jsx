import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mixin } from 'core-decorators'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { message as MSG } from 'antd'
import i18n from 'i18n'

import '../reducers'

@connect(state => ({
  globalMessage: state.globalMessage
}))
@mixin(PureRenderMixin)
export default class extends Component {

  static displayName = 'GlobalMessage';

  constructor() {
    super();
    this.t = i18n.getFixedT(null, 'error');
  }

  componentDidUpdate() {
    const { t } = this;
    const {type, message} = this.props.globalMessage;

    if (message) {
      this.hide && this.hide();

      if (typeof message === 'object') {
        let msg = ''

        if (Object.keys(message).length === 0) {
          msg = t('NETWORK/UNAVAILABLE');
        } else {
          msg = t(message.code) || message.message;
        }

        this.hide = MSG[type](msg, 0);
      } else {
        this.hide = MSG[type](message, 0);
      }
      this.timer = setTimeout(this.hide, 1500);
    }
  }

  render() {
    return null;
  }

}
