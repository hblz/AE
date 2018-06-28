import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Spin } from 'antd'

import '../reducers'

@connect(state => ({
  isLoading: state.isLoading
}))
export default class extends Component {

  render () {
    return (
      <Spin spining={this.props.isLoading}>{this.props.children}</Spin>
    )
  }

}
