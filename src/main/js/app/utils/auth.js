'use strict';

import Storage from 'utils/storage';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';
import moment from 'moment';

const storage = new Storage();

const TOKENS_KEY = 'LOGIN_TOKENS';
const UC_KEY = 'UC_KEY';
const USER_KEY = 'LOGIN_USER';
const VORG_KEY = 'VORG_KEY'
const VORG_NAME = 'VORG_NAME'
const VORG_ID = 'VORG_ID'

let tokensObj, authObj;

function nonce(diff) {
  function rnd(min, max) {
    const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    let range = max ? max - min : min,
      str = '',
      i,
      length = arr.length - 1;

    for (i = 0; i < range; i++) {
      str += arr[Math.round(Math.random() * length)];
    }

    return str;
  }

  return new Date().getTime() + (diff || 0) + ':' + rnd(8);
}

export default {
  setVorgId: function (name) {
    storage.set(VORG_ID, name)
  },
  getVorgId: function () {
    return storage.get(VORG_ID)
  },
  setUCKey: function (name) {
    storage.set(UC_KEY, name)
  },
  getUCKey: function () {
    return storage.get(UC_KEY)
  },
  setVorgName: function (name) {
    storage.set(VORG_NAME, name)
  },
  getVorgName: function () {
    return storage.get(VORG_NAME)
  },
  setVorg: function (key) {
    storage.set(VORG_KEY, key)
  },
  isVorg: function () {
    return storage.get(VORG_KEY)
  },
  isLogin: function () {
    return this.getTokens() && this.getAuth();
  },

  /**
   * Check the specific user's permission, based on roles.
   *
   * @param availableRoles {Array} 可以访问的角色列表
   * @returns {boolean}
   */
  hasAuth: function (availableRoles) {
    // 未登录，或登录失效
    if (!this.isLogin()) {
      return false;
    }

    const auth = this.getAuth();
    const userRoles = auth.roles && auth.roles.length ? ['VISITOR', ...auth.roles] : ['VISITOR'];

    if (!auth) {
      return false;
    }

    if (!availableRoles || availableRoles.length === 0) {
      return true;
    }

    return availableRoles.some(role => userRoles.indexOf(role) !== -1);
  },

  setAuth: function (auth) {
    authObj = auth;

    if (auth === null) {
      storage.remove(USER_KEY);
    } else {
      storage.set(USER_KEY, auth);
    }
  },

  getAuth: function () {
    let auth = authObj;

    if (!auth) {
      auth = storage.get(USER_KEY);

      if (auth) {
        authObj = auth;
      }
    }

    if (auth) {
      const args = Array.prototype.slice.call(arguments);
      let key;

      while ((key = args.shift()) && auth) {
        auth = auth[key];
      }
    }

    return auth;
  },

  getTokens: function (key) {
    let tokens = tokensObj || undefined;
    let tokensT = storage.get(TOKENS_KEY) || undefined;

    if (tokensT === undefined || tokens === undefined) {
      // 本地存储
      tokens = tokensT
    }

    if (tokens) {
      // 失效判断
      if (moment(tokens['expires_at']) <= moment()) {
        this.setTokens(tokens = null);
      }
    }

    if (tokens) {
      tokensObj = tokens;
    }

    if (key && tokens) {
      return tokens[key];
    }

    return tokens;
  },

  /**
   * 设置或清除 tokens
   * @param {object} tokens token值
   */
  setTokens: function (tokens) {
    tokensObj = tokens;

    if (tokens === null) {
      storage.remove(TOKENS_KEY);
    } else {
      tokens.diff = new Date(this.getTokens('server_time')) - new Date();
      storage.set(TOKENS_KEY, tokens);
    }
  },

  destroy: function () {
    this.setTokens(null);
    this.setAuth(null);
    this.setVorg(null)
    this.setVorgName(undefined) // 设置为undefined便于路由那么的逻辑判断
    this.setVorgId(undefined)
    // window.one.UC.isLogin().then((isLogin) => {
    //   isLogin && window.one.logout()
    // })
  },

  getAccessToken: function () {
    return this.getTokens('access_token');
  },

  getAuthentization: function (method, url, host) {
    return ['MAC id="' + this.getAccessToken() + '"',
      'nonce="' + this._getNonce() + '"',
      'mac="' + this._getMac(method, url, host) + '"'
    ].join(',');
  },

  _getMacContent: function (method, url, host) {
    return [this.nonce, method, url, host, ''].join('\n');
  },

  _getMac: function (method, url, host) {
    return HmacSHA256(
      this._getMacContent(method, url, host),
      this.getTokens('mac_key')
    ).toString(Base64);
  },

  _getNonce: function () {
    return (this.nonce = nonce(this.getTokens('diff')));
  },

  getMac: function (options) {
    return HmacSHA256(
      this._getMacContent(options.method, options.url, options.host),
      options.macKey
    ).toString(Base64);
  },

  getNonce: function () {
    return this._getNonce();
  },

  /**
   * 获取 e-leaning 单点登录 __mac 参数
   * @param url 接口地址，eg: /ndu/mystudy/user_center
   * @param host 接口主机，eg: my-study-webfront.debug.web.nd
   * @return {string}
   */
  getSSOMac (url, host) {
    return window.btoa(this.getAuthentization('GET', url, host))
  }
};
