import React from 'react'
import utils, { md5 } from 'utils'

import { message } from 'antd'
import './static/styles/upload.scss'

import Uploader from './uxcore-uploader'

class IndexToken extends React.Component {
  static propTypes = {
    fileSizeLimit: React.PropTypes.number,
    onFileFiltered: React.PropTypes.func,
    setFileList: React.PropTypes.func,
    getToken: React.PropTypes.func,
    handleFileError: React.PropTypes.func,
    onUploadcompleted: React.PropTypes.func,
    accept: React.PropTypes.string,
    multiple: React.PropTypes.bool,
    noAuth: React.PropTypes.string,
    serviceName: React.PropTypes.string,
    path: React.PropTypes.string,
    scope: React.PropTypes.number
  };

  constructor () {
    super()
    this.state = {
      fileList: []
    }
  }

  getFile = () => {
    return this.state.fileList
  }

  setStatus = (fileList) => {
    this.setState({
      fileList: fileList
    })
  }

  _getToken = (request) => {
    const that = this
    return new Promise((resolve, reject) => {
      return that.props.getToken(request.file.name).then(response => {
        resolve(response.data)
      }).catch(e => {
        reject(e)
      })
    }).then(result => {
      that._setRequest(request, result)
    }, response => {
      if (response.data.code === 'UC/AUTH_INVALID_TOKEN') {
        message.error(that.props.noAuth)
      } else {
        message.error('获取token失败')
      }
      request.file.cancel()
      return false
    })
  }

  _setRequest = (request, result) => {
    request.setParam('name', request.file.name)
    request.setParam('size', request.file.size)
    request.setParam('md5', md5(request.file))
    request.setParam('scope', this.props.scope === 0 ? this.props.scope : 1)
    let url = ''
    if (this.props.serviceName) {
      url = `${utils.CS_API_ORIGIN}/v0.1/upload?serviceName=${this.props.serviceName}` +
          `&token=${result.token}&policy=${result.policy}&date=${encodeURIComponent(result.date_time)}`
    } else {
      url = `${utils.CS_API_ORIGIN}/v0.1/upload?session=${result.session}`
    }
    request.setUrl(url)
    request.setParam('path', this.props.path || result.path)
    if (this.props.setFileList) {
      this.props.setFileList(request.file)
    }
  }

  render () {
    let error = false
    let that = this
    const uploadProps = {
      name: 'file',
      multiple: this.props.multiple || false,
      sizeLimit: this.props.fileSizeLimit || 0,
      accept: this.props.accept || null,
      onfileuploadpreparing (request) {
        error = false
        return that._getToken(request)
      },
      onfileuploaderror (File, Error) {
        error = true
        if (that.props.handleFileError) {
          that.props.handleFileError(File, Error)
        }
      },
      onfileuploadcompleted (File, Status) {
        if (!error) {
          that.state.fileList.push(JSON.parse(File.response.rawResponse.rawResponse))
          if (that.props.onUploadcompleted) {
            that.props.onUploadcompleted(File, Status, true)
          }
        }
      },
      onfileuploadprogress (File, Progress) {
        if (that.props.onUploadProgress) {
          that.props.onUploadProgress(File, Progress)
        }
      },
      onfilefiltered (file, error) {
        if (that.props.onFileFiltered) {
          that.props.onFileFiltered(file, error, that.props.accept)
        }
      }
    }

    return (
      <div className='token-upload'>
        <Uploader {...uploadProps} />
      </div>
    )
  }

}

export default IndexToken
