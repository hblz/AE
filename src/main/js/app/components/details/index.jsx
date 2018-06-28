import React from 'react'
import utils from 'utils';
import i18n from 'i18n';
import './i18n';
import { Icon } from 'antd';
import ImageBox from './main/imageBox';
import AudioBox from './main/audioBox';
import ArticleBox from './main/articleBox';
import TextBox from './main/textBox';
import RichBox from './main/richBox';
import BoxBox from './main/boxBox';
import LinkBox from './main/linkBox';
import DefaultBox from './main/defaultBox';
import './static/styles/index.scss';

export default class extends React.Component {
  static propTypes = {
    record: React.PropTypes.shape({
      type: React.PropTypes.string.isRequired,
      content: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.object,
        React.PropTypes.array
      ]).isRequired
    }),
    oaId: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]).isRequired,
    mode: React.PropTypes.string
  };

  static defaultProps = { 
    record: { },
    oaId: "",
    mode: "table"
  };

  render() {
    const t = i18n.getFixedT(null, 'details');
    const record = this.props.record;
    const oaId = this.props.oaId;
    const mode = this.props.mode;
    switch(record.type){
      case "image":
        return record.status == 2 ? <span><i className="iconfont icon-image margin-right-0-5em"></i>{"[" + t('image') + "]"}</span> : <ImageBox detail={record.content} oaId={oaId} />
        
      break;
      case "article":
        return record.status == 2 ? <span><i className="iconfont icon-article margin-right-0-5em"></i>{"[" + t('article') + "]"}</span> : <ArticleBox detail={record.content} oaId={oaId} />
      break;
      case "audio":
        return record.status == 2 ? <span><i className="iconfont icon-audio margin-right-0-5em"></i>{"[" + t('audio') + "]"}</span> : <AudioBox detail={record.content} oaId={oaId} />
      break;
      case "text":
        return (
          <TextBox detail={record.content} oaId={oaId} mode={mode} />
        )
      break;
      case "rich":
        return (
          <RichBox detail={record} oaId={oaId} />
        )
      break;
      case "box":
        return (
          <BoxBox detail={record} oaId={oaId} />
        )
      break;
      case "link":
        return (
          <LinkBox detail={record} oaId={oaId} />
        )
      break;
      default:
        return (
          <DefaultBox detail={record} oaId={oaId} />
        )
      break;
    }
  }
}