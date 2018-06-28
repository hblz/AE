import React from 'react'
import autobind from 'core-decorators/lib/autobind';
import utils from 'utils';
import i18n from 'i18n';
import { getParsedByContentType } from 'utils/parse';
import { Icon } from 'antd';

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

  @autobind
  showOrHide(e){
    this.setState({
      showBig: !this.state.showBig
    });
  }

  render() {
    const detail = this.props.detail;
    const type = detail.type;
    const content = getParsedByContentType("Content-Type:" + type + "/xml", detail.content);
    return (
      <div className="record-box">
        <div className="short">
          <i className="iconfont icon-richtext margin-right-0-5em"></i><a className="ellipsis max-width-20" onClick={this.showOrHide}>{"[" + this.t('rich') + "]"}</a>
        </div>
        <div className="record-box-big-shadow" style={{display: this.state.showBig ? "block" : "none"}}>
        </div>
        <div className="record-box-big" style={{display: this.state.showBig ? "table" : "none"}}>
          <div>
            <div className="rich-box">
              <div className="header-box">
                <span>{this.t('richInfo')}</span>
                <Icon type="cross" onClick={this.showOrHide} />
              </div>
              <div className="rich-info" dangerouslySetInnerHTML={{__html:content}}></div>
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