import React from 'react';
import { connect } from 'react-redux';
const defaultSrc = require('./static/images/qrcode.png');

@connect(state => ({
  channel: state.channel
}))
export default class extends React.Component {
  constructor() {
    super();

    this.state = {
    };
  }

  render() {
    // 显示二维码
    return <img id="qrcode" src='' width="100" height="100" src={defaultSrc}/>;
  }
}
