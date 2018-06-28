import React from 'react';
import autobind from 'core-decorators/lib/autobind';
import i18n from 'i18n';
import { Icon } from 'antd';
import './static/styles/index.scss';
import './i18n';

export default class extends React.Component {
  static propTypes = {
    // 默认星级
    value: React.PropTypes.number,
    // 是否只读
    readOnly: React.PropTypes.bool,
    // 是否需要取消按钮
    hasCancel: React.PropTypes.bool,
    // 星标改变时的回调函数
    onChange: React.PropTypes.func
  };

  static defaultProps = {
    value: 0,
    readOnly: false,
    hasCancel: false
  };

  state = {
    value: 0
  };

  // 当前星级
  currentValue = 0;

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      const value = nextProps.value;

      this.setState({
        value: value
      });

      this.currentValue = value;
    }
  }

  componentDidMount() {
    const value = this.props.value;

    this.setState({
      value: value
    });

    this.currentValue = value;
  }

  // 取值
  get value() {
    return this.state.value;
  }

  // 设值
  set value(value) {
    this.setState({
      value: value
    });

    this.currentValue = value;
  }

  render() {
    const t = i18n.getFixedT(null, 'star');

    return (
      <span className="cmp-star">
        {
          [1, 2, 3, 4, 5].map(function (item) {
            const props = this.props.readOnly ? null : {
              onMouseEnter: this._handleMouseEnter.bind(null, item),
              onMouseLeave: this._handleMouseLeave,
              onClick: this._handleChange.bind(null, item)
            };

            return <Icon key={item} type={this.state.value >= item ? 'star' : 'star-o'} {...props}/>;
          }.bind(this))
        }
        {
          this.props.hasCancel &&
          <span className="remove-star" title={t('cancel')} onClick={this._handleChange.bind(null, 0)}>
            {t('cancel')}
          </span>
        }
      </span>
    );
  }

  // 设置星标
  @autobind
  _handleChange(value) {
    if (this.props.onChange) {
      this.props.onChange(value).then(() => {
        this.setState({
          value: value
        });

        this.currentValue = value;
      });
    } else {
      this.setState({
        value: value
      });

      this.currentValue = value;
    }
  }

  // 鼠标移上时
  @autobind
  _handleMouseEnter(value) {
    this.setState({
      value: value
    });
  }

  // 鼠标移开时
  @autobind
  _handleMouseLeave() {
    this.setState({
      value: this.currentValue
    });
  }
};