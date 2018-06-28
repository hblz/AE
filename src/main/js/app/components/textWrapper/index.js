import React from 'react'
import './theme/styles/index.scss'

/**
 * 文字包裹层
 */
export default class extends React.Component {
  /**
   * propTypes
   * @type {Object}
   * @property {string} propTypes.content 文字内容
   * @property {string} propTypes.width 宽度
   * @property {string} propTypes.maxWidth 最大宽度
   * @property {string} propTypes.maxHeight 最大高度
   */
  static propTypes = {
    content: React.PropTypes.string,
    width: React.PropTypes.number,
    maxWidth: React.PropTypes.number,
    maxHeight: React.PropTypes.number
  }

  static defaultProps = {
    content: '',
    width: 100,
    maxWidth: 0,
    maxHeight: 0
  }

  render () {
    const {content, width, maxWidth, maxHeight} = this.props
    let styles = {}
    let className = ''

    styles.width = `${width}px`

    if (maxHeight) {
      className = 'text-box'
      styles.maxHeight = `${maxHeight}px`
    } else {
      className = 'text-ellipsis'

      if (maxWidth) {
        styles.maxWidth = `${maxWidth}px`
      }
    }

    return <pre className={className} title={content} style={styles}>
      {content}
    </pre>
  }
}
