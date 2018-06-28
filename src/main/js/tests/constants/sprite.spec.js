import { TYPE } from 'modules/sprite/constants/index.js'
import { getFormatContent, getParsedByContentType } from 'utils/parse.js'
import { GetLength, cutstr } from 'utils/strSplit.js'
import { getFormatDate, getFormatDateStr } from 'utils/currenttime.js'
import { md5, urlParams, auth } from 'utils'

describe('constants', () => {
  it('constants', () => {
    TYPE.BUBBLE === '气泡'
  })
})

describe('parse', () => {
  it('parse', () => {
    getParsedByContentType('<p>test</p>')
    getFormatContent('Content-Type: rich/xml\r\n\r\n<div style="font-size:12pt; font-family:微软雅黑; color:#00395b;"><img src="29635e28-95c1-47f9-8459-b425e4d3c818" size="8947" mime="jpg" width="285" height="162" md5="3d497f4384c0de6f20ef6b45e419ac29" name="img.jpg" /><span>这两个是写的demo</span></div>', 'demo')
    getFormatContent('Content-Type: text/plain\r\n\r\n[sys:1041]')
    getFormatContent('Content-Type: text/plain\r\n\r\n[cat:1041]')
    getFormatContent('Content-Type: text/plain\r\n\r\n[cos:1041]')
    getFormatContent('Content-Type: text/plain\r\n\r\n[emoji:1041]')
    getFormatContent('Content-Type: img/xml\r\n\r\n<img src="7782845e-9495-47c0-8c26-1c6958ea3025" size="62822" mime="jpg" width="793" height="795" md5="7f014869058edf670129dbe70e860e73" name="img.jpg" />')
    getFormatContent('Content-Type: file/xml\r\n\r\n<?xml version="1.0" encoding="utf-8"?>\r\n<file src="55033347-7748-495b-b4eb-02deb69cae7a" name="js.zip" size="2626356" md5="d52951611e3032a19ec8411d3dc52501"/>')
    getFormatContent('Content-Type: location/xml\r\n\r\n<location  longitude="119" latitude="26" label="福州六一路亚太中心" scale= "16" />')
    getFormatContent('Content-Type: location/xml\r\n\r\n<location  longitude="119" latitude="26" label="福州六一路亚太中心" scale= "16" />')
    getFormatContent('Content-Type: folder/xml\r\n\r\n<folder src="DentryID" name="汇报" encoding=\'zip\' size="1024" md5="bcb31b38e4c01691881e38023dea69e9"/>')
    getFormatContent('Content-Type: audio/xml\r\n\r\n<audio src="DentryID" mime="amr" dura="12" size="3076" encoding=\'zip\' md5="bcb31b38e4c01691881e38023dea69e9" />')
  })
})

describe('strSplit', () => {
  it('strSplit', () => {
		let word = 'afdddd对对对都偶偶'
    GetLength(word)
		cutstr(word, 10)
  })
})

describe('MD5', () => {
  it('MD5', () => {
		md5('123456')
  })
})

describe('Param', () => {
  it('Param', () => {
		urlParams.getParamObj()
		auth.setVorgId('51585')
  })
})

describe('FormatDate', () => {
  it('FormatDate', () => {
		getFormatDate(new Date())
		getFormatDateStr(new Date())
  })
})
