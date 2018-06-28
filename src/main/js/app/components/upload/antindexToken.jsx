import React from 'react'
import i18n from 'i18n'

import { Upload, Button, Icon, message } from 'antd'
import utils, { md5 } from 'utils'

import './static/styles/upload.scss'
const defaultThumb = require('./static/images/lietu.png')

export default class extends React.Component {
  static propTypes = {
    upload: React.PropTypes.func,
    formatContent: React.PropTypes.string,
    multiple: React.PropTypes.bool,
    size: React.PropTypes.number,
    config: React.PropTypes.object.isRequired,
    pUploadPic: React.PropTypes.string,
    accept: React.PropTypes.string,
    imgTypes: React.PropTypes.array,
    file: React.PropTypes.array,
    uploadWarn: React.PropTypes.string,
    className: React.PropTypes.string
  };

  constructor (props) {
    super()

    this.state = {
      file: props.file || []
    }
    this.fileLength = props.file ? props.file.length : 0
    this.t = i18n.getFixedT(null, 'sprite')
    this.chunkMaxSize = props.size || 1024 * 1024 * 1
  }

  // 上传之前存值
  _handleBeforeUpload = (file) => {
    const { t } = this
    if (this.fileLength > 4) {
      message.warn(t('soperation.warning2', {count: 5}))
      return false
    }
    const info = file
    let after = info.name.substring(info.name.lastIndexOf('.'), info.name.length)
    let flag = false
    if (after) {
      after = after.toLowerCase()
      for (let imgType of (this.props.imgTypes || utils.imgTypes)) {
        if (imgType === after) {
          flag = true
          break
        }
      }
    }
    if (!flag) {
      message.warn(this.props.pUploadPic)
      return false
    }
    if (info.size > this.chunkMaxSize) {
      message.warn(this.props.uploadWarn)
      return false
    }

    this.fileLength += 1
    const self = this
    const fileReader = new FileReader()

    fileReader.readAsDataURL(file)

    // 预览图片
    fileReader.onload = function () {
      let that = this
      let files = self.state.file
      var image = new Image()
      image.src = this.result
      image.onload = function () {
        files.push({
          uid: new Date().getTime(),
          metaJson: `{width: ${image.width}, height: ${image.height}}`,
          name: '',
          status: 'done',
          url: that.result,
          thumbUrl: that.result,
          info: file
        })
        self.setState({
          file: files
        })
      }
    }
    return false
  }

  getFile = () => {
    return this.state.file
  }

  setFile = (uid) => {
    if (uid) {
      let files = this.state.file
      for (let i = 0; i < files.length; i++) {
        if (files[i].uid === uid) {
          files.splice(i, 1)
          this.fileLength -= 1
          break
        }
      }
      this.setState({
        reflash: true
      })
      return
    }
    this.fileLength = 0
    this.setState({
      file: []
    })
  }

  setOldFile = (files) => {
    this.fileLength = files.length
    this.setState({
      file: files
    })
  }

  // 上传，暴露方法
  upload = () => {
    let options = {}
    const config = this.props.config

    options.session = config.session || {}
    options.uploadUrl = config.remote.upload || {}
    options.formData = []

    for (let file of this.state.file) {
      if (file.dentryId) {
        continue
      }
      if (file.info !== undefined) {
        let formData = new FormData()
        // 上传文件及附带数据
        formData.append('name', file.info.name)
        formData.append('size', file.info.size)
        // formData.append('path', data.path);
        formData.append('file', file.info)
        formData.append('md5', md5(file.info))
        formData.append('metaJson', file.metaJson)

        config.remote.formData && Object.keys(config.remote.formData).map(key => {
          formData.append(key, config.remote.formData[key])
        })
        options.formData.push(formData)
      }
    }
    return options
  }

  _handleThumbError = (e) => {
    e.target.src = defaultThumb
  }

  render () {
    const {className} = this.props
    const that = this
    const files = this.state.file
    // FIX: chrome bug http://stackoverflow.com/questions/39187857/inputfile-accept-image-open-dialog-so-slow-with-chrome
    // 不使用 "image/*"，因为会导致卡顿
    const ALL_IMG_TYPES = 'image/bmp, image/jpg, image/png, image/gif, image/jpeg'
    return <div className={className || ''}>
      {
        files.length > 0
        ? <div>
        {
          this.props.multiple
          ? <div className='upload-zip' style={{float: 'left', marginRight: '10px'}}>
          <Upload
                listType='picture'
                accept={this.props.accept || ALL_IMG_TYPES}
                multiple={this.props.multiple}
                beforeUpload={this._handleBeforeUpload}
                config={this.props.config}>
            <Icon type='plus' />
              <div className='zip-format'>
                {this.props.formatContent }
              </div>
          </Upload>
        </div>
        : ''
        }
        {
          files.map(file => {
            return <div className='upload' key={file.uid}>
              <img src={file.url} onError={that._handleThumbError}/>
              <div>
                <Button type='ghost' onClick={that.setFile.bind(this, file.uid)}>
                  <Icon type='cross' />
                </Button>
              </div>
            </div>
          })
        }
        </div>
        : <div className='upload-zip'>
          <Upload
                listType='picture'
                accept={this.props.accept || ALL_IMG_TYPES}
                multiple={this.props.multiple}
                beforeUpload={this._handleBeforeUpload}
                config={this.props.config}>
            <Icon type='plus' />
              <div className='zip-format'>
                {this.props.formatContent }
              </div>
          </Upload>
        </div>
      }
    </div>
  }
}
