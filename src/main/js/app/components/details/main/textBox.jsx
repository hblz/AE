import React from 'react'
import autobind from 'core-decorators/lib/autobind';
import utils from 'utils';
import i18n from 'i18n';
import { Icon } from 'antd';
import { getParsedByContentType } from 'utils/parse';

export default class extends React.Component {
  static propTypes = {
    detail: React.PropTypes.string.isRequired,
    oaId: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    mode: React.PropTypes.string
  };

  static defaultProps = { 
    detail: { },
    oaId: "",
    mode: ""
  };

  state = {
    showBig: false
  };

  t = i18n.getFixedT(null, 'details');

  @autobind
  showOrHide(e){
    this.setState({
      showBig: !this.state.showBig
    });
  }

  render() {
    const detail = this.props.detail;
    const message = getParsedByContentType("Content-Type:text/plain", detail);
    const messageTd = message.replace(/<br\/>/g, '')
    return (
      <div className="record-box">
        <div className={this.props.mode == "table" ? "short" : "short text"}>
          <i className="iconfont icon-text margin-right-0-5em"></i>
          {
            this.props.mode == "table" 
            ? <a className="ellipsis max-width-20" onClick={this.showOrHide} dangerouslySetInnerHTML={{__html:messageTd}}></a> 
            : <span dangerouslySetInnerHTML={{__html:message}}></span>
          }
        </div>
        <div className="record-box-big-shadow" style={{display: this.state.showBig ? "block" : "none"}}>
        </div>
        <div className="record-box-big" style={{display: this.state.showBig ? "table" : "none"}}>
          <div>
            <div className="text-box">
              <div className="header-box">
                <span>{this.t('textInfo')}</span>
                <Icon type="cross" onClick={this.showOrHide} />
              </div>
              <span dangerouslySetInnerHTML={{__html:message}}></span>
              <div className="button-box">
                <a className="ant-btn ant-btn-primary ant-btn-lg" onClick={this.showOrHide}>{this.t('close')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}