import './static/styles/index.scss';
import React from 'react';
import { Modal, Button } from 'antd';

export default React.createClass({
  getInitialState() {
    return {
      visible: false
    };
  },

  componentWillMount() {
    this.setState({
      visible: this.props.visible
    });
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible
    });
  },

  handleOk() {
    this.props.onOk && this.props.onOk();

    if (!this.props.onClick || (this.props.onClick && this.props.onClick())) {
      this.setState({
        visible: false
      });
    }
  },

  handleCancel() {
    this.props.onCancel && this.props.onCancel();

    this.setState({
      visible: false
    });
  },

  render() {
    var props = {
      className: 'cmp-dialog',
      title: this.props.title || '',
      width: this.props.width || 450,
      visible: this.state.visible,
      onOk: this.handleOk,
      onCancel: this.handleCancel
    };

    /*
     buttons = {
     'cancel': '取消',
     'ok': '确定'
     };
     */
    // 按钮配置
    if (this.props.buttons) {
      props['footer'] = [];

      // 取消
      if (this.props.buttons['cancel']) {
        props['footer'].push(
          <Button className="ant-btn-lg" type="ghost" onClick={this.handleCancel}>{this.props['buttons']['cancel']}</Button>
        );
      }

      // 确定
      if (this.props.buttons['ok']) {
        props['footer'].push(
          <Button className="ant-btn-lg" type="primary" onClick={this.handleOk}>{this.props['buttons']['ok']}</Button>
        );
      }
    }

    return (
      <Modal {...props}>
        <div className="dialog-content">
          {this.props.children}
        </div>
      </Modal>
    );
  }
});