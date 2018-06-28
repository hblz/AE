import React from 'react'
import utils from 'utils'
import debounce from 'core-decorators/lib/debounce'
import Model from './models/users'
import { Select } from 'antd'
import './theme/styles/index.scss'

const Option = Select.Option

/**
 * 用户选择器
 * @example
 * import UserSelect from 'components/user/select'
 * <UserSelect onChange={(value) => {
 *   alert(value)
 * }} />
 */
export default class extends React.Component {
  constructor () {
    super()
  }

  /**
   * 选中值
   * @type {Array}
   */
  selectedValues = []

  /**
   * state
   * @type {Object}
   * @property {Array} state.options 下拉菜单选项
   */
  state = {
    options: []
  }

  /**
   * propTypes
   * @type {Object}
   * @property {string} propTypes.placeholder 占位符
   * @property {boolean} propTypes.multiple 是否多选
   * @property {string} propTypes.width 宽度
   * @property {function} propTypes.onChange change 事件
   */
  static propTypes = {
    label: React.PropTypes.string,
    defaultValue: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    multiple: React.PropTypes.bool,
    selectAll: React.PropTypes.bool,
    width: React.PropTypes.string,
    onChange: React.PropTypes.func
  }

  /**
   * defaultProps
   * @type {Object}
   */
  static defaultProps = {
    label: '请选择用户',
    placeholder: '',
    multiple: false,
    selectAll: true,
    width: '180px',
    onChange: () => {
    }
  }

  render () {
    const {placeholder, multiple, selectAll, width, onChange, defaultValue} = this.props
    const props = {
      placeholder: this.props.label,
      searchPlaceholder: placeholder,
      notFoundContent: '',
      defaultValue
    }

    if (selectAll) {
      this.state.options.unshift(<Option value=''>所有用户</Option>)
    }

    return multiple ? <Select
      {...props}
      className='select-handler'
      multiple
      style={{width: width}}
      onSelect={(value) => {
        this.selectedValues.push(value)
        onChange(this.selectedValues.trim().join(','))
      }}
      onDeselect={(value) => {
        this.selectedValues = this.selectedValues.filter(item => item !== value)
        onChange(this.selectedValues.trim().join(','))
      }}
      onSearch={this._handleSearch.bind(this)}
      tokenSeparators={[',']}>
      {this.state.options}
    </Select> : <Select
      {...props}
      showSearch
      filterOption={() => {
        return true
      }}
      allowClear
      style={{width: '200px'}}
      onSearch={this._handleSearch.bind(this)}
      onSelect={(value) => {
        onChange(value.trim())
      }}>
      {this.state.options}
    </Select>
  }

  /**
   * 输入中
   */
  @debounce(200)
  _handleSearch (value) {
    if (!value) this.props.onChange('')

    let options = []
    let option = []
    let username
    let userId

    // new Model()
    //   .onAny((options) => {
    //     options.replacement = {
    //       'org_id': this.orgId,
    //       'node_id': 0
    //     }
    //   })
    option = {
      nodeId: '0',
      $limit: utils.PAGE_SIZE,
      $count: true,
      children: true,
      keyword: value
    }
    window.one.OMS.findUsers(option)
      .then((response) => {
        if (response.items.length) {
          response.items.map((item, key) => {
            username = item['real_name'] || item['nick_name'] || item['user_name']
            userId = item['user_id'] || item['org_user_code']

            if (username) {
              // FIX: 当输入完整 ID 时，选中下拉菜单有 BUG，加上 '\n\n' 可以解决
              options.push(<Option className='select-option' key={`${key}-${userId}`} value={userId + '\n\n'}>
                {`${username} (${userId})`}
              </Option>)
            }
          })
        }

        this.setState({options})
      })
      .catch((response) => {
        this.setState({options})
      })
  }
}
