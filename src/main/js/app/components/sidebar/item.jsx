import React from 'react';
import autobind from 'core-decorators/lib/autobind'
import mixin from 'core-decorators/lib/mixin'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import classNames from 'classnames';
import PropTypes from 'prop-types'

const stringOrNumber = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number
])

@mixin(PureRenderMixin)
export default class extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isOpen: this._isOpen(props, context)
    }
  }

  static contextTypes = {
    itemHeight: stringOrNumber,
    onItemClick: PropTypes.func,
    activeItem: PropTypes.string
  };

  static propTypes = {
    style: PropTypes.object,
    width: stringOrNumber
  };

  static childContextTypes = {
    itemHeight: stringOrNumber,
    isOpen: PropTypes.bool,
    onItemClick: PropTypes.func,
    activeItem: PropTypes.string
  };

  getChildContext() {
    return {
      itemHeight: this.context.itemHeight || this.props.itemHeight,
      isOpen: this.state.isOpen,
      onItemClick: this.context.onItemClick,
      activeItem: this.context.activeItem
    }
  }

  @autobind
  _isOpen(props, context) {
    const { activeItem } = context;
    let isOpen = false;

    const hasActiveChild = (props) => {
      const { children } = props;

      if (!children) return;

      if (Array.isArray(children)) {
        children.forEach(child => {
          if (activeItem.indexOf(child.props.path) !== -1) {
            isOpen = true;
          } else {
            hasActiveChild(child.props)
          }
        })
      } else {
        hasActiveChild(children.props);
      }
    };

    hasActiveChild(props);

    return isOpen;
  }

  @autobind
  _handleClick(e) {
    this.setState({
      isOpen: !!!this.state.isOpen
    });

    this.context.onItemClick(e, this.props.path, this);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { activeItem } = nextContext;

    if (!this.state.isOpen || activeItem === '#/') {
      this.setState({
        isOpen: this._isOpen(nextProps, nextContext)
      })
    }
  }

  render() {
    const hasChildren = this.props.children;

    const { activeItem } = this.context;
    const classes = classNames('ui-sidebar-item', {
      'has-child': hasChildren,
      open: hasChildren && this.state.isOpen,
      active: !hasChildren && activeItem && activeItem.indexOf(this.props.path) !== -1
    });

    const titleClasses = classNames({
      'iconfont': this.props.icon,
      [`icon-${this.props.icon}`]: this.props.icon
    });

    return (
      <li className={classes}>
        <a
          href={this.props.path}
          style={{height: this.context.itemHeight, lineHeight: this.context.itemHeight}}
          onClick={this._handleClick}
          >
          <i className={titleClasses}/>
          <span>{this.props.title}</span>
          {hasChildren && <i className="arrow"></i>}
        </a>
        {this.props.children}
      </li>
    )
  }
}
