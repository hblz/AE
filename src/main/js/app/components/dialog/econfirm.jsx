import './static/styles/index.scss';
import React, {PropTypes} from 'react'
import { Modal, Button } from 'antd';

export default class extends React.Component {
  static propTypes = {
    entrance: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    visible: PropTypes.bool,
    title: PropTypes.node,
    onOk: PropTypes.func,
    okText: PropTypes.node,
    cancelText: PropTypes.node,
    onCancel: PropTypes.func,
    className: PropTypes.string,
    onOpen: PropTypes.func,
    footer: PropTypes.node,
    noFooter: PropTypes.bool,
    disable: PropTypes.bool,
    width: PropTypes.number
  }

  static defaultProps = {
    title: '',
    onOk: function () {},
    okText: 'confirm',
    cancelText: 'cancel',
    onCancel: function () {},
    onOpen: function () {},
    noFooter: false
  }

  constructor(props) {
    super(props)
    this.state = {
      visible: props.visible
    }
  }

  componentWillReceiveProps(nextProps) {
    const isChanged = nextProps.visible !== undefined && this.state.visible
    if (isChanged) {
      this.setState({
        visible: nextProps.visible
      })
    }
  }

  handleOpen() {
    this.setState({
      visible: true
    })
    this.props.onOpen()
  }

  handleClose() {
    if (this.props.disable) {
      return
    }
    this.setState({
      visible: false
    })
    this.props.onCancel()
  }

  handleOk() {
    if (this.props.onOk()) {
      this.setState({
        visible: false
      })
    }
  }

  getDefaultFooter() {
    const {okText, cancelText} = this.props
    return [<Button className="ant-btn-lg" type="ghost" onClick={::this.handleClose}>{cancelText}</Button>, <Button className="ant-btn-lg" type="primary" onClick={::this.handleOk}>{okText}</Button>]
  }

  render() {
    const {title, entrance, className} = this.props
    const {visible} = this.state
    const props = {
      title,
      visible,
      onOk: ::this.handleOk,
      onCancel: ::this.handleClose
    }

    if (!this.props.noFooter) {
      props['footer'] = this.props.footer ? [this.props.footer] : this.getDefaultFooter();
    }

    if (this.props.width) {
      props.width = this.props.width
    }

    return (
      <span className={className}>
        {entrance ? <span onClick={::this.handleOpen}>{entrance}</span> : null}
        <Modal {...props}>
          <div className="dialog-content">
            {this.props.children}
          </div>
        </Modal>
      </span>
    )
  }
}
