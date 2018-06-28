import React from 'react'
import utils, { md5 } from 'utils';
import autobind from 'core-decorators/lib/autobind'

import { message ,Icon,Button } from 'antd'
import i18n from 'i18n'

import Uploader from './uxcore-uploader'
import PercentDailog from './percentDailog'

const zip = require('./static/images/zip.png');
const skin = require('./static/images/skin.png');
const mp3 = require('./static/images/mp3.png');

class Index extends React.Component {
  static propTypes = {
    session: React.PropTypes.object,
    disable: React.PropTypes.bool,
    fileSizeLimit: React.PropTypes.number,
    onFileFiltered: React.PropTypes.func,
    handleFileError: React.PropTypes.func,
    onUploadcompleted: React.PropTypes.func,
    accept: React.PropTypes.string,
    multiple: React.PropTypes.bool,
    formatContent: React.PropTypes.string,
    content: React.PropTypes.string,
    waiting: React.PropTypes.string,
    scope: React.PropTypes.number
  };

  constructor() {
    super();
    this.state = {
      percent : 0,
      visible : false,
      complete : false,
      file : undefined
    };
  }

  @autobind
  _close(){
    this.close()
    // this.props.onUploadcompleted(this.state.file, null, false)
  }

  @autobind
  close(){
    this.setState({
      percent : 0,
      visible : false,
      complete : false,
      file : undefined
    });
  }

  @autobind
  getFile(){
    return this.state.file
  }

  @autobind
  setStatus (file) {
    this.setState({
      complete: true,
      file: file
    })
  }


  render() {
    let fileNum = 0;
    let error = false
    let fileCompleteNum = 0;
    let fileErrorName = "";
    let that = this;
    const uploadProps = {
      name: "file",
      multiple: this.props.multiple || false,
      chunkEnable: true,
      sizeLimit: this.props.fileSizeLimit || 0,
      chunkSize: 5 * 1024 * 1024,
      chunkRetries: 2,
      accept: this.props.accept || null,
      hideProgress: this.props.hideProgress,
      onfileuploadpreparing(request) {
        request.setParam('name', request.file.name);
        request.setParam('size', request.file.size);
        request.setParam('md5', md5(request.file));
        request.setParam('scope', that.props.scope === 0 ? that.props.scope : 1);
        request.setParam('chunks', Math.ceil(request.file.size / request.chunkSize));
        request.setUrl(utils.CS_API_ORIGIN + '/v0.1/upload?session=' + that.props.session.session); //added by xiefei
        let path = '';
        let {session, dentryId} = that.props;
        if (!(typeof dentryId == 'undefined' || dentryId == null)) {
          request.setParam('parentId', dentryId);
        } else {
          request.setParam('path', session.path);
        }
        fileNum++;
        error = false
        that.setState({
          complete : true
        })
      },
      onchunkuploadpreparing(ChunkRequest) {
        ChunkRequest.setParam('chunkSize', ChunkRequest.blob.size)
        ChunkRequest.setParam('chunk', ChunkRequest.index)
      },
      onfileuploaderror(File, Error) {
        error = true
        that.setState({
          visible : false,
          complete : false,
          percent : 0
        });
        if (that.props.handleFileError) {
          that.props.handleFileError(File, Error)
        }
      },
      onfileuploadcompleted(File, Status) {
        fileCompleteNum++;
        if (fileNum == fileCompleteNum && !error) {
          that.setState({
            visible : false,
            complete : true,
            file: File.response.rawResponse.rawResponse
          })
          if (that.props.onUploadcompleted) {
            that.props.onUploadcompleted(File, Status, true)
          }
        }
      },
      onfileuploadprogress(File, Progress) {
        that.setState({
          visible : Progress.percentage===100 ? false : true,
          percent : Progress.percentage
        });
      },
      onfilefiltered(file, error) {
        if (that.props.onFileFiltered) {
          that.props.onFileFiltered(file, error, that.props.accept);
        }
      }
    }

    const modalProps = {
      visible : this.state.visible,
      percent : this.state.percent,
      content : this.props.content,
      waiting : this.props.waiting
    }

    return (
      <div>
      {
        this.state.complete
        ?
        <div className="zip-div">
          <img src={this.props.accept === 'zip,ZIP' ? zip : mp3}/>
          <Button type="ghost" onClick={this._close}>
            <Icon type="cross" />
          </Button>
        </div>
        :
        <div className="upload-zip">
          <Uploader
            className={this.props.disable ? "disable" : ""}
            {...uploadProps}
            disabled={this.props.disable}>
            <Icon type="plus" />
            {
              this.props.disable
              ?
              ""
              :
              <div className="zip-format">
                {this.props.formatContent || i18n.t('zipFormate')}
              </div>
            }
          </Uploader>
        </div>
      }
        <PercentDailog {...modalProps}/>
      </div>
    )
  }

}

export default Index
