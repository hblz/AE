import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// 前置资源优先加载(注意顺序)
import '../i18n'
import '../reducers'
import './static/styles/ant.scss'
import * as actionCreators from '../actions'

import Header from './header'
import Sidebar from './sidebar'
import Main from './main'

@connect(state => ({
  language: state.language,
}), actionCreators)
export default class extends React.Component {
  static propTypes = {
    changeLanguage: PropTypes.func
  }

  constructor() {
    super();
  }

  componentWillMount () {
  }

  render () {
    return (
      <div className="container">
        <Header {...this.props}/>
        <div className="body">
          <Sidebar location={this.props.location}/>
          <Main {...this.props}/>
        </div>
      </div>
    );
  }
}
