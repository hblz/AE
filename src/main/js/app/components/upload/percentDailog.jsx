import React from 'react'
import {Modal} from 'antd';
import i18n from 'i18n';
import './static/styles/upload.scss';
const loading = require('./static/images/loading.gif');

class PercentDailog extends React.Component {

  constructor() {
    super();
    this.state = {};
    this.t = i18n.getFixedT(null, 'packages');
  }

  componentDidMount() {
  }


  render() {
      const { t } = this
      return (
        <div>
         <Modal className="percent-modal" visible={this.props.visible}>
            <div>
              <img src={loading}/>
              <br />
              {(this.props.content || t('packages.uploading')) + parseInt(this.props.percent) + "%..." + (this.props.waiting || t('packages.waiting'))}
            </div>
          </Modal>
          </div>
      )
  }

}

export default PercentDailog;
