import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MessageHandler from 'modules/_global/message/components'

@connect(state => ({language: state.language}))
export default class extends React.Component {

  static propTypes = {
    children: PropTypes.any
  }

  static childContextTypes = {
    language: PropTypes.string
  }

  getChildContext() {
    return {
      language: this.props.language
    }
  }

  render() {

    return (
      <div>
        <MessageHandler />
        {/* this will render the child routes */}
        { this.props.children }
      </div>
    )
  }
}
