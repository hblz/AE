import React from 'react'
import autobind from 'core-decorators/lib/autobind';
import utils from 'utils';
import Currenttime from 'utils/currenttime';
import i18n from 'i18n';
import { Icon } from 'antd';

export default class extends React.Component {
  static propTypes = {
    detail: React.PropTypes.object.isRequired,
    oaId: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]).isRequired
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
    const oaUrl = utils.OA_API_ORIGIN + "/v1.8/console/oas/" + this.props.oaId + "/audios/mp3?dentry_id=";
    let size = detail.size;
    if(size / 1024 < 1){
      size = size + "B";
    }else if(size / (1024 * 1024) < 1){ 
      size = (size / 1024).toFixed(2) + "KB";
    }else{ 
      size = (size / (1024 * 1024)).toFixed(2) + "MB";
    }
    return (
      <div className="record-box">
        <div className="short">
          <i className="iconfont icon-audio margin-right-0-5em"></i><a className="ellipsis max-width-20" onClick={this.showOrHide}>{"[" + this.t('audio') + "]"}</a>
        </div>
        <div className="record-box-big-shadow" style={{display: this.state.showBig ? "block" : "none"}}>
        </div>
        <div className="record-box-big" style={{display: this.state.showBig ? "table" : "none"}}>
          <div>
            <div className="audio-box">
              <div className="header-box">
                <span>{this.t('audioInfo')}</span>
                <Icon type="cross" onClick={this.showOrHide} />
              </div>
              <div className="info">
                <div>{detail.title}</div>
                <p>{size}</p>
                <p>{Currenttime.getFormatDateStr(detail.update_time)}</p>
              </div>
              <audio preload="auto" src={oaUrl + detail.src} controls="controls"></audio>
              <div className="button-box">
                <a className="ant-btn ant-btn-primary ant-btn-lg" href={oaUrl + detail.src}>{this.t('download')}</a>
                <a className="ant-btn ant-btn-primary ant-btn-lg" onClick={this.showOrHide}>{this.t('close')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}