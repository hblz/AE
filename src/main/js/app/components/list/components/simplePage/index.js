import React from 'react'
import { Button, Icon } from 'antd'
import './static/styles/index.scss'
import utils from 'utils'

export default class extends React.Component {
  constructor() {
    super()
  }

  static propTypes = {
    hasNext: React.PropTypes.bool,
    onPage: React.PropTypes.func
  }

  static defaultProps = {
    hasNext: true,
    onPage: () => {
    }
  }

  state = {
    $offset: 0
  }

  render() {
    const { $offset } = this.state
    const { hasNext } = this.props

    return <div className="simple-page">
      <Button.Group>
        <Button type="ghost" onClick={this._goPrev} disabled={$offset === 0}>
          <Icon type="left" />
          <span>上一页</span>
        </Button>
        <Button type="ghost" onClick={this._goNext} disabled={!hasNext}>
          <span>下一页</span>
          <Icon type="right" />
        </Button>
      </Button.Group>
    </div>
  }

  /**
   * 上一页
   */
  _goPrev = () => {
    const { $offset } = this.state
    const { onPage } = this.props
    const $currentOffset = $offset - utils.PAGE_SIZE

    this.setState({
      $offset: $currentOffset
    })

    onPage($currentOffset)
  }

  /**
   * 下一页
   */
  _goNext = () => {
    const { $offset } = this.state
    const { onPage } = this.props
    const $currentOffset = $offset + utils.PAGE_SIZE

    this.setState({
      $offset: $currentOffset
    })

    onPage($currentOffset)
  }
}
