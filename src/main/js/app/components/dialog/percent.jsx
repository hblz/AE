import React from 'react'
import {Modal} from 'antd';

import './static/styles/index.scss';
const loading = require('./static/images/loading.gif');

class PercentDailog extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
  }


  render() {
      const { t } = this;
      return (
        <div>
         <Modal className="percent-modal" visible={this.props.visible}>
            <div>
              <img src={loading}/>
              <br />
              {this.props.children}
            </div>
          </Modal>
          </div>
      )
  }

}

export default PercentDailog;
