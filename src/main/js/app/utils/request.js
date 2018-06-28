import axios from 'axios'
import auth from './auth'
import json from 'json-bigint'
import i18n from 'i18n'
import urlParams from './urlParams'

const PROTECTION_PREFIX = /^\)\]\}',?\n/;
const encode = window.encodeURIComponent;
const addParam = (url, params) => {
  let arr = Object.keys(params).map(key => encode(key) + '=' + encode(params[key])).join('&');

  if (!arr) {
    return url;
  }

  return url + (url.indexOf('?') !== -1 ? '&' : '?') + arr;
};

/**
 * Ajax Request, based on axios
 *
 * @class Request
 */
export default class Request {

  constructor(baseUri = [], cache = false, setAuth = true) {
    /**
     * @abstract
     * @type {Array}
     */
    this.baseUri = baseUri;
    this.cache = cache;
    this.setAuth = setAuth;
  }

  /**
   * 参数 options 说明
   *
   * {number|string|array} uri    资源 ID, 可以是数组
   * {object} replacement         用于替换 url 中的变量, 如 {uri}
   *
   * {object} params              the URL parameters to be sent with the request
   * {object} data                the data to be sent as the request body
   * @see {@link https://github.com/mzabriskie/axios} for more options
   *
   */
  request(options) {
    options.headers = options.headers || {};

    let { uri, params, replacement, addPath, ...other } = options;
    let url = this.baseUri;

    // uri: id | null | undefined
    if (uri || uri === 0) {
      uri = [].concat(uri).map(item => '' + encode(item));
      url = url.concat(uri);
    }

    // remove empty values
    url = url.filter(val => !!val).join('/');
    // 附加路径
    if (addPath) {
      url = url.concat(addPath)
    }
    if (params) {
      url = addParam(url, params);
    }

    // disable cache
    if (!this.cache) {
      // waf DOESN'T support cors Cache-Control header currently
      // would be REMOVED after waf updated
      url = addParam(url, {
        _: new Date().getTime()
      });
    }

    // 替换 URL 中的变量，如 {xxx}
    if (replacement) {
      Object.keys(replacement).forEach(function (key) {
        url = url.replace(new RegExp('{' + key + '}', 'img'), encode(replacement[key]));
      });
    }

    // has uc tokens
    if (this.setAuth && auth.getTokens()) {
      var matched = url.match(/^(?:https?:)?\/\/([^\/]+)(\/.+)$/i);
      // options.headers.Authorization = auth.getAuthentization(options.method, matched[2], matched[1]);
      options.headers.Authorization = window.one.UC.getAuthHeader(url, options.method)
    }

    let rule = /official-account|level4culture|task4admin|pbl4remind|pbl4back|pbl4task|elearning-task-gateway|pbl4vip|pbl4sign|vip-admin|startup-alert-admin|pbl-flower-manager|im-sign|sign-out|pbl4configlog|social-reward-delivery-admin|social-achieve-delivery-admin|date-config|pbl4personal|config-admin/
    if (auth.isVorg() && rule.test(url)) {
      //虚拟组织登录接口头部需要加vorg参数
      options.headers['vorg'] = auth.getVorgName()
    }

    if (i18n.language) {
      options.headers['Accept-Language'] = i18n.language;
    }

    return axios({
      url: url,
      responseType: "text",
      // 服务端 bigint 处理
      transformResponse: [function (responseText) {
        let data = responseText.replace(PROTECTION_PREFIX, '');
        try {
          data = json.parse(data);
        } catch (e) { /* Ignore */ }
        return data;
      }],
      ...other
    });
  }
}
