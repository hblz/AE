'use strict'

var Browser = require('nd-browser')

module.exports = {

  download: function (options) {
    var data = options.data
    var type = options.type
    var name = options.name

    if (typeof data === 'string') {
      console.log(1)
      data = [data]
    }


    var blob = new Blob(data, {
      type: type
    })

    if (Browser.browser === 'IE') {
      window.navigator.msSaveBlob(blob, name)
    } else {
      var anc = document.createElement('a')
      anc.href = window.URL.createObjectURL(blob)
      anc.setAttribute('download', name)
      anc.style.display = 'none'
      anc.click()
      anc.remove()
    }
  }

}
