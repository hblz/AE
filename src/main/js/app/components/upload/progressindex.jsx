import React from 'react'
import utils, { md5 } from 'utils'

import { Icon, message } from 'antd'

import './static/styles/upload.scss'
import Uploader from './uxcore-uploader'
import SessionModel from './models/session'
import SearchModel from './models/search'
import PortraitsModel from '../../modules/albums/models/portraits'

class Index extends React.Component {
  static propTypes = {
    accept: React.PropTypes.string,
    fileSizeLimit: React.PropTypes.number,
    formatContent: React.PropTypes.string,
    config: React.PropTypes.object.isRequired,
    scope: React.PropTypes.number,
    setFileList: React.PropTypes.func,
    onUploadProgress: React.PropTypes.func,
    chunkSize: React.PropTypes.number
  };

  constructor () {
    super()
    this.state = {
    }
  }

  _getUserId = (value, request, resolve, reject, config) => {
    const that = this
    return new SearchModel()
    .onAny(options => {
      options.replacement = {
        org_id: utils.auth.getAuth('org_exinfo', 'org_id'),
        node_id: 0
      }
      options.params = {
        name: value,
        $offset: 0,
        $limit: 10,
        filter: 'org_user_code' // 只查询工号学号'org_user_code|user_name|nick_name|real_name'
      }
    }).GET().then(response => {
      const data = response.data.items
      if (data.length > 0) {
        // 获取 session
        new SessionModel(config.session)
          .onAny(opts => {
            opts.replacement = {
              uri: data[0].user_id
            }
          }).GET()
          .then(resp => {
            resp.data.userId = data[0].user_id
            resolve(resp.data)
          })
      } else {
        message.warn(that.props.errMsg.noUser)
        request.file.cancel()
      }
    }).catch(e => {
      reject(e)
    })
  }

  _getSession = (request) => {
    const that = this
    const config = this.props.config
    let name = request.file.name.split('.')[0]
    return new Promise((resolve, re) => {
      that._getUserId(name, request, resolve, re, config)
    }).then(result => {
      that._setRequest(request, result)
    }, response => {
      request.file.cancel()
      if (response.data.code === 'UC/AUTH_INVALID_TOKEN') {
        message.error(that.props.errMsg.noAuth)
        return false
      }
    })
  }

  _setPortraits = (data) => {
    const that = this
    const img = {
      src: 'dentry://' + data.dentry_id,
      md5: data.inode.md5
    }
    return new PortraitsModel()
    .onAny(options => {
      options.replacement = {
        id: data.userId
      }
    }).POST({
      data: {
        origin: {
          image: img
        },
        small: img
      }
    }).then(result => {
      if (that.props.onUploadcompleted) {
        that.props.onUploadcompleted(result)
      }
    })
  }

  _setRequest = (request, result) => {
    request.setParam('name', request.file.name)
    request.setParam('size', request.file.size)
    request.setParam('md5', md5(request.file))
    request.setParam('scope', this.props.scope === 0 ? this.props.scope : 1)
    request.setParam('chunks', Math.ceil(request.file.size / request.chunkSize))
    request.setUrl(utils.CS_API_ORIGIN + '/v0.1/upload?session=' + result.session)
    request.setParam('path', result.path)
    request.setParam('userId', result.userId)
    this.props.setFileList(request.file)
  }

  render () {
    let fileNum = 0
    let error = false
    let fileCompleteNum = 0
    let that = this
    const uploadProps = {
      name: 'file',
      multiple: true,
      chunkEnable: true,
      sizeLimit: this.props.fileSizeLimit || 0,
      chunkSize: this.props.chunkSize || 5 * 1024 * 1024,
      chunkRetries: 2,
      accept: this.props.accept || null,
      onfileuploadpreparing (request) {
        fileNum++
        error = false
        return that._getSession(request)
      },
      onchunkuploadpreparing (ChunkRequest) {
        ChunkRequest.setParam('chunkSize', ChunkRequest.blob.size)
        ChunkRequest.setParam('chunk', ChunkRequest.index)
      },
      onfileuploaderror (File, Error) {
        error = true
        if (that.props.handleFileError) {
          that.props.handleFileError(File, Error)
        }
      },
      onfileuploadprogress (File, Progress) {
        if (that.props.onUploadProgress) {
          that.props.onUploadProgress(File, Progress)
        }
      },
      onfileuploadcompleted (File, Status) {
        fileCompleteNum++
        if (fileNum === fileCompleteNum && !error) {
          if (that.props.onUploadcompleted) {
            that.props.onUploadcompleted(File, Status, true)
          } else if (File.response) {
            let resp = JSON.parse(File.response.rawResponse.rawResponse)
            resp.userId = File.request.params.params[6].value
            that._setPortraits(resp)
          }
        }
      },
      onfilefiltered (file, errors) {
        error = true
        if (that.props.onFileFiltered) {
          that.props.onFileFiltered(file, errors, that.props.accept)
        }
      }
    }

    return (
      <div>
        <div className='upload-zip' style={{position: 'relative'}}>
          <Uploader
            {...uploadProps}>
            <Icon type='plus' />
              <div className='zip-format'>
                {this.props.formatContent}
              </div>
          </Uploader>
        </div>
      </div>
    )
  }

}

export default Index
