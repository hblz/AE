import React from 'react'
import SessionModel from './models/session'
import UploadModel from './models/upload'
import utils from 'utils'

import { Upload, Button, Icon, message } from 'antd'
import i18n from 'i18n'
import './i18n'

import './static/styles/index.scss'

export default class extends React.Component {
  constructor() {
    super()

    // 缓存当前文件
    this.file = null
    this.t = i18n.getFixedT(null, 'uploader')
    this.state = {
      file: null
    }
  }

  // 上传列表改变时
  _handleChange = (info) => {
    if (info.fileList.length === 0) {
      this.file = null
      this.setState({
        file: null
      })
    }
  }

  // 上传之前存值
  _handleBeforeUpload = (file) => {
    const { t } = this
    if (file.size > 5242880) {
      message.error(t('upload.fileSize'))
      return false
    }

    const self = this
    const fileReader = new FileReader()

    // 缓存当前文件
    self.file = file

    fileReader.readAsDataURL(file)

    // 预览图片
    fileReader.onload = function () {
      self.setState({
        file: {
          // -1: 图片已更换， 0: 初始
          uid: -1,
          name: '',
          status: 'done',
          url: this.result,
          thumbUrl: this.result
        }
      })
    }

    return false
  }

  // 上传第 1 步：获取 session，用于上传授权
  _getSession() {
    return new Promise(resolve => {
      // 获取 session
      new SessionModel(this.props.config.locale.session)
        .POST()
        .then(response => {
          resolve(response.data)
        })
    })
  }

  // 上传第 2 步：开始上传
  _doUpload(data) {
    const self = this
    const config = this.props.config
    let formData = new FormData()

    // 上传文件及附带数据
    if (this.file) {
      formData.append('name', this.file.name)
      formData.append('size', this.file.size)
      formData.append('file', this.file)
    }
    formData.append('path', data.path)

    config.remote.formData && Object.keys(config.remote.formData).map(key => {
      if (key === 'filePath') {
        formData.append('filePath', config.remote.formData[key].replace('{path}', data.path))
      } else {
        formData.append(key, config.remote.formData[key])
      }
    })

    return new Promise(resolve => {
      // 开始上传
      new UploadModel(config.remote.upload.replace('{session}', data.session))
        .POST({
          data: formData
        })
        .then(response => {
          resolve(response.data)
        })
    })
  }

  // 上传，暴露方法
  upload(required = false) {
    const { t } = this
    return new Promise(resolve => {
      const doUpload = dentryId => {
        if (dentryId) {
          resolve(dentryId)
        } else {
          // 获取授权 session
          this._getSession().then(sessionData => {
            // 执行上传
            this._doUpload(sessionData).then(uploadData => {
              resolve(uploadData['dentry_id'])
            })
          })
        }
      }

      // 如果文件必选
      if (required) {
        // 已选中文件，则执行上传
        if (this.state.file) {
          // 图片已更换
          if (this.state.file.uid === -1) {
            doUpload()
          } else if (this.props.dentryId) {
            doUpload(this.props.dentryId)
          } else {
            doUpload()
          }
        } else {    // 否则
          message.error(t('upload.pselectFile'))
        }
      } else {
        if (this.file) {
          doUpload()
        }
        else {
          resolve()
        }
      }
    })
  }

  // 设置默认显示文件
  _setDefaultFile = (url) => {
    this.setState({
      file: {
        // -1: 图片已更换， 0: 初始
        uid: 0,
        name: '',
        status: 'done',
        url: url,
        thumbUrl: url
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.dentryId !== nextProps.dentryId && nextProps.dentryId) {
      this._setDefaultFile(this._getUrl(nextProps.dentryId))
    }
  }

  // 获取文件地址
  _getUrl(dentryId) {
    const download = this.props.config.remote.download
    dentryId = dentryId || this.props.dentryId

    return download ? download :
      dentryId ? `${utils.CS_API_ORIGIN}/v0.1/download?dentryId=${dentryId}` : ''
  }

  componentDidMount() {
    this._getUrl() && this._setDefaultFile(this._getUrl())
  }

  render() {
    const { t } = this
    return <Upload
      className="clearfix"
      listType="picture"
      accept=".gif,.jpeg,.jpg,.bmp,.png"
      multiple={false}
      onChange={this._handleChange}
      beforeUpload={this._handleBeforeUpload}
      fileList={this.state.file ? [this.state.file] : []}
      config={this.props.config}>
      <Icon type="plus" />
      <div className="upload-tip">
        {t('upload.uploadFile')}
      </div>
    </Upload>
  }
}
