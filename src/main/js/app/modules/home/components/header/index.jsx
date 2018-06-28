import React from 'react'
import { connect } from 'react-redux'
import { autobind } from 'core-decorators'
import { Select } from 'antd'
import { Link } from 'react-router-dom'
import utils from 'utils'
import i18n, { DEFAULT_LANGUAGE } from 'i18n'

import * as actionCreators from '../../actions'
import { LANGUAGES } from '../../constants'

import './static/styles/header.scss'

const Option = Select.Option;
const defaultFace = require('./static/images/default-face.jpg');


@connect(state => ({
  language: state.language
}), actionCreators)
export default class extends React.Component {
  constructor() {
    super();
    this.t = i18n.getFixedT(null, 'home');
  }

  // 头像获取失败，用默认头像代替
  _handleLoadFaceError(e) {
    e.target.src = defaultFace;
  }

  @autobind
  _onLanguageChange(lng) {
    this.props.changeLanguage(lng);
  }

  componentWillMount() {
    let { language } = this.props;
    if (LANGUAGES.indexOf(language) === -1) {
        language = language.split('-')[0];

      if (LANGUAGES.indexOf(language) === -1) {
        language = DEFAULT_LANGUAGE;
      }
      this.props.changeLanguage(language);
    }
  }

  render() {
    const { t } = this;
    const userInfo = utils.auth.getAuth();
    return (
      <div className="header">
        <a className="site-title" href="#/index"></a>
        <div className="divider">
          <i className="foreground logout iconfont icon-logout"></i>
          <Link className="background" to="/logout">{t('logout')}</Link>
        </div>
        <div className="divider">
          <img className="foreground user-icon"
               src=''
               onError={this._handleLoadFaceError}/>
          <div className="background" title={'admin'}>admin</div>
        </div>
        {<div className="language-select">
          <i className="iconfont icon-globe"/>
          <Select
            size="large"
            dropdownClassName="language-dropdown"
            defaultValue={this.props.language}
            value={this.props.language}
            onChange={this._onLanguageChange}>
            {
              LANGUAGES.map(lng => <Option key={lng} value={lng}>{t(`languages.${lng}`)}</Option>)
            }
          </Select>
        </div>}
      </div>
    );
  }
};
