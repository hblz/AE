import React from 'react'
import ReactDOM from 'react-dom'
import autobind from 'core-decorators/lib/autobind'
import PropTypes from 'prop-types'

const stringOrNumber = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number
])

export default class extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      activeItem: props.activeItem
    }
  }

  static contextTypes = {
    itemHeight: stringOrNumber,
    isOpen: PropTypes.bool,
    onItemClick: PropTypes.func,
    activeItem: PropTypes.string
  };

  static propTypes = {
    itemHeight: stringOrNumber,
    style: PropTypes.object,
    selectedItemStyle: PropTypes.object,
    width: stringOrNumber,
    activeItem: PropTypes.string
  };

  static defaultProps = {
    itemHeight: '64px'
  };

  static childContextTypes = {
    itemHeight: stringOrNumber,
    onItemClick: PropTypes.func,
    activeItem: PropTypes.string
  };

  getChildContext() {
    return {
      itemHeight: this.props.itemHeight || this.context.itemHeight,
      onItemClick: this.context.onItemClick || this._onItemClick,
      activeItem: this.props.activeItem || this.context.activeItem || this.state.activeItem
    }
  }

  @autobind
  _onItemClick(e, key, item) {
    if (key && this.state.activeItem !== item.key) {
      this.setState({
        activeItem: item.path
      });
    }
  }

  @autobind
  _getSidebarHeight() {
    if (!this.el) return;

    if (this.height !== undefined) return this.height;

    const el = this.el.cloneNode(true);

    el.style.position = 'absolute';
    el.style.left = '-9999px';

    //Hide the element and allow the browser to automatically resize it.
    el.style.visibility = 'hidden';
    el.style.height = 'auto';

    document.body.appendChild(el);

    //Determine the height of the menu.
    this.height = el.offsetHeight;

    document.body.removeChild(el);

    return this.height;
  }

  componentDidMount() {
    this.el = ReactDOM.findDOMNode(this);
  }

  render() {
    const height = this.context.isOpen ? this._getSidebarHeight() : 0;

    return (
      <ul className="ui-sidebar" style={{height: height}}>
        {this.props.children}
      </ul>
    )
  }
}