import React from 'react';
import Loading from 'modules/_global/loading/components'

import './static/styles/main.scss'

export default class extends React.Component {
  constructor() {
    super();
  }

  componentDidMount () {
  }

  render () {
    return (
      <div className='main'>
        { this.props.children }
      </div>
    );
  }
};
