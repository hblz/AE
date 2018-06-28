import React from 'react'
import autobind from 'core-decorators/lib/autobind';
import utils from 'utils';
import i18n from 'i18n';
import { Icon } from 'antd';
import { getParsedByContentType } from 'utils/parse';

export default class extends React.Component {
  static propTypes = {
    detail: React.PropTypes.object.isRequired,
    oaId: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ])
  };

  static defaultProps = { 
    detail: { },
    oaId: ""
  };

  state = {
    showBig: false
  };

  t = i18n.getFixedT(null, 'details');
  csUrl = utils.CS_API_ORIGIN + "/v0.1/download?dentryId=";

  @autobind
  showOrHide(e){
    this.setState({
      showBig: !this.state.showBig
    });
  }

  render() {
    const detail = this.props.detail;
    return (
      <div className="record-box">
        <div className="short">
          <i className="iconfont icon-image margin-right-0-5em"></i><a className="ellipsis max-width-20" onClick={this.showOrHide}>{"[" + this.t('image') + "]"}</a>
        </div>
        <div className="record-box-big-shadow" style={{display: this.state.showBig ? "block" : "none"}}>
        </div>
        <div className="record-box-big" style={{display: this.state.showBig ? "table" : "none"}}>
          <div>
            <div className="image-box">
              <div className="header-box">
                <span>{this.t('imageInfo')}</span>
                <Icon type="cross" onClick={this.showOrHide} />
              </div>
              <div className="img">
              {
                detail.source_id.indexOf('smiley://') == 0 
                ? 
                <div dangerouslySetInnerHTML={{__html:getParsedByContentType("Content-Type:text/plain", detail.source_id.substring(9))}}></div>
                : 
                <div><img src={this.csUrl + detail.source_id} /></div>
              }
              </div>
              <div className="button-box">
                {
                  detail.source_id.indexOf('smiley://') == 0 
                  ? 
                  null
                  : 
                  <a className="ant-btn ant-btn-primary ant-btn-lg" href={this.csUrl + detail.source_id + '&attachment=true'}>{this.t('download')}</a>
                }
                <a className="ant-btn ant-btn-primary ant-btn-lg" onClick={this.showOrHide}>{this.t('close')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}