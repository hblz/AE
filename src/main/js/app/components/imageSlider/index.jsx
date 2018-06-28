import React from 'react'
import Lightbox from 'react-images'

export default class extends React.Component {
  static propTypes = {
    onClose: React.PropTypes.func,
    isOpen: React.PropTypes.bool,
    images: React.PropTypes.array
  }

  static defaultProps = {
    onClose: () => {
    },
    isOpen: false,
    images: []
  }

  state = {
    currentImage: 0
  }

  render() {
    const {isOpen, images} = this.props
    const props = {
      images,
      isOpen,
      currentImage: this.state.currentImage,
      onClose: this._handleClose,
      onClickNext: this._handleClickNext,
      onClickPrev: this._handleClickPrev,
      onClickThumbnail: this._handleClickThumbnail,
      showThumbnails: true
    }
    return <Lightbox{...props} />
  }

  _handleClose = () => {
    this.props.onClose()
  }

  _handleClickNext = () => {
    this.setState({currentImage: this.state.currentImage + 1})
  }

  _handleClickPrev = () => {
    this.setState({currentImage: this.state.currentImage - 1})
  }

  _handleClickThumbnail = (index) => {
    this.setState({currentImage: index})
  }
}