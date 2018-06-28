export const keyMirror = function (obj) {
  var ret = {};
  var key;

  for (key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }
    ret[key] = key;
  }
  return ret;
};

/**
 * 简化版Promise.all
 * 与原生的区别是，不管有没有error, 回调都是完整的数据而不是第一个被reject的返回值
 * @param arr {Array} promise数组
 * @returns {Promise}
 */
export const promiseAll = arr => {
  let args = Array.prototype.slice.call(arr);

  return new Promise(function (resolve, reject) {
    if (args.length === 0) return resolve([]);

    let remaining = args.length;
    let isError = false;

    const callback = (i, error) => res => {
      if (error) isError = true;

      args[i] = res;

      if (--remaining === 0) {
        isError ? reject(args) : resolve(args);
      }
    };

    args.forEach((val, i) => {
      if (typeof val.then === 'function') {
        val
          .then(callback(i))
          .catch(callback(i, true));
      } else {
        callback(i)(val);
      }
    });
  });
};

/**
 * 深拷贝对象
 */
export const deepCopy = (obj) => {
  if (typeof obj !== 'object') {
    return obj
  }
  let newObj = {}
  for(let key in obj) {
    newObj[key] = deepCopy(obj[key])
  }
  return newObj
}

export const cx = classNames => {
  if (typeof classNames === 'object') {
    return Object.keys(classNames).filter(function (className) {
      return classNames[className]
    }).join(' ')
  } else {
    return Array.prototype.join.call(arguments, ' ')
  }
}

/**
 * 下载
 * @param url {String} 下载地址
 */
export const download = (url) => {
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.src = url

    document.body.appendChild(iframe)
  }