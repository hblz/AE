'use strict';

export default {
  getParamObj: function () {
  // 获取访问url的参数
  let paramData = {};
  let params = window.location.search
  params = params.substr(1) //去掉问号
  if (params) {
    let paramArr = params.split('&')
    paramArr.forEach(function (param) {
      let pair = param.split('=')
      paramData[pair[0]] = pair[1]
    });
  }
  return paramData
  },
  // 获取url参数
  getQueryString: function (name) {
    let after = window.location.hash.split("?")[1];
    if (after) {
      let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
      let r = after.match(reg);
      if (r != null) {
        return decodeURIComponent(r[2]);
      } else {
        return null;
      }
    }
  }
}
