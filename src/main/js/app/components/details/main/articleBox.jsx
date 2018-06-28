import React from 'react'
import autobind from 'core-decorators/lib/autobind';
import utils from 'utils';
import StrSplit from 'utils/strSplit';
import i18n from 'i18n';
import { Icon } from 'antd';

export default class extends React.Component {
  static propTypes = {
    detail: React.PropTypes.array.isRequired,
    oaId: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ])
  };

  static defaultProps = { 
    detail: [],
    oaId: ""
  };

  state = {
    showBig: false
  };

  csUrl = utils.CS_API_ORIGIN + "/v0.1/download?dentryId=";
  t = i18n.getFixedT(null, 'details');

  @autobind
  showOrHide(e){
    this.setState({
      showBig: !this.state.showBig
    });
  }

  render() {
    const that = this;
    const detail = this.props.detail;
    return (
      <div className="record-box">
        <div className="short">
          <i className="iconfont icon-article margin-right-0-5em"></i><a className="ellipsis max-width-20" title={detail[0].title} onClick={this.showOrHide}>{detail[0].title}</a>
        </div>
        <div className="record-box-big-shadow" style={{display: this.state.showBig ? "block" : "none"}}>
        </div>
        <div className="record-box-big" style={{display: this.state.showBig ? "table" : "none"}}>
          <div>
            <div className="news-box">
              <div className="header-box">
                <span>{this.t('articleInfo')}</span>
                <Icon type="cross" onClick={this.showOrHide} />
              </div>
              <div className="news">
                <div>
                  <div className="default-news-box">
                    <div className="title"><a href={detail[0].href} target="_blank"><span title={detail[0].title}>{detail[0].title}</span></a></div>
                    <div className="photo">
                      <div>
                        <img src={this.csUrl + detail[0].cover.source_id}/>
                        {detail[0].summary ? <p className="discription-box" title={detail[0].summary}>{StrSplit.GetLength(detail[0].summary) > 86 ? StrSplit.cutstr(detail[0].summary, 86) : detail[0].summary}</p> : ''}
                      </div>
                    </div>
                  </div>{
                    detail.length > 1 
                    ? <ul className="photo-news-list">{
                        detail.map(function(item, key){
                          return (
                             key > 0 ? <li key={key}>
                              <div className="photo"><div><img src={that.csUrl + item.cover.source_id + '&size=80'}/></div></div>
                              <div className="title"><a href={item.href} target="_blank">{item.title}</a></div>
                            </li> : null
                          )
                        })
                      }</ul> 
                    : null
                  }
                </div>
              </div>
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