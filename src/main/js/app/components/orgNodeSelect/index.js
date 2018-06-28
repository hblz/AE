import React from 'react'
import utils from 'utils'
import i18n from 'i18n'
import debounce from 'core-decorators/lib/debounce'
import {Select, Button} from 'antd'
import TreeModal from './treeModal'
import './theme/styles/index.scss'
import './i18n'
const t = i18n.getFixedT(null, 'orgNodeSelect')
const Option = Select.Option

/**
 * 组织节点选择
 */
export default class extends React.Component {
  constructor () {
    super()
  }

  // 选中值
  selectedValues = []

  state = {
    first: true,
    hasSelect: false,
    options: [],
    orgNodes: {items: []}, // 组织树默认为空数组
    node: {
      nodeId: '',
      nodeName: ''
    },
    visible: false
  }

  static propTypes = {
    // Modal的title 格式为:请选择XXX,未选中时会提示title，故要请选择XXX
    title: React.PropTypes.string,
    // 占位符
    placeholder: React.PropTypes.string,
    // select宽度
    width: React.PropTypes.string,
    // 回调事件 回调参数为{nodeId: '', nodeName: ''}
    callBack: React.PropTypes.func,
    // 输入框的值
    nodeName: React.PropTypes.string,
    // 是否需要所有作为父节点
    needAll: React.PropTypes.bool
  }

  static defaultProps = {
    title: t('title'),
    placeholder: t('choose'),
    width: '200px',
    needAll: false,
    callBack: () => {
    }
  }
  componentDidMount () {
    this._getNodes()
    this.setState({
      node: {
        ...this.state.node,
        nodeName: this.props.nodeName
      }
    })
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.nodeName !== nextProps.nodeName) {
      this.setState({
        node: {
          ...this.state.node,
          nodeName: nextProps.nodeName
        }
      })
    }
  }

  @debounce(200)
  _searchOrg (value) {
    let options = []
    value = value.replace(/^\s+|\s+$/g, '')
    this.state.node.nodeName = value
    if (this.state.hasSelect) {
      this.state.hasSelect = false
      return
    }
    if (!value) {
      this.props.callBack({nodeId: '', nodeName: ''})
      this.setState({options})
      return
    }
    // new OrgNodeSearchModal()
    //   .onAny((options) => {
    //     options.replacement = {
    //       org_id: this.orgId,
    //       node_id: 0
    //     }
    //   })
    //   .GET({
    //     params: {
    //       $offset: 0,
    //       $limit: utils.PAGE_SIZE,
    //       name: value
    //     }
    //   })
    const option = {
      nodeId: '0',
      $offset: 0,
      $limit: utils.PAGE_SIZE,
      $count: true,
      children: true,
      keyword: value
    }
    window.one.OMS.findNodes(option)
    .then((response) => {
      if (response.items.length) {
        response.items.map((item, key) => {
          options.push(<Option key={item.node_id}
              value={item.node_name || item.org_full_name}
              node_id = {item.node_id}
              org_id = {item.org_id}>
            {item.node_name}
          </Option>)
        })
      }
      this.setState({options})
    })
    .catch((response) => {
      this.setState({options})
    })
  }
  _selectNodes = (value, option) => {
    let node = {
      nodeId: option.props.node_id,
      nodeName: value
    }
    this.setState({
      hasSelect: true,
      options: [],
      node: node
    })
    this.props.callBack(node)
  }
  _show = () => {
    if (this.props.needAll) {
      this.refs.tree.selectAllFun()
    }
    this.setState({
      visible: true
    })
  }
  _hide = () => {
    this.setState({
      visible: false
    })
  }

  getChildNodes = node_id => {
    return window.one.OMS.getChildNodes({nodeId: node_id + '', $offset: 0, $limit: 100, $count: true, userAmount: false})
  }

  _getNodes = ({node_id = 0, org_id = 0} = {}) => {
    let _self = this
    // if (!utils.auth.isVorg() || (node_id !== 0 && org_id === 0)) {
    //   org_id = this.orgId
    // }
    // one.OMS.getChildNodes(node_id, 0, -1, true)
    // (utils.auth.isVorg() ? new VOrgNodesModal() : new OrgNodesModal())
    //   .onAny((options) => {
    //     options.replacement = {
    //       org_id,
    //       node_id,
    //       v_org_id: utils.auth.isVorg() ? utils.auth.getAuth('org_exinfo', 'v_org_id') : null
    //     }
    //   })
    //   .GET({
    //     params: {
    //       $offset: 0,
    //       $limit: -1
    //     }
    //   })
    this.getChildNodes(node_id)
    .then((response) => {
      let items = []
      if ((response.items || response.node_items).length) {
        items = response.items || response.node_items
      }
      _self.setState({
        orgNodes: {items: items}
      })
    })
    .catch((response) => {
    })
  }
  _treeOk = (nodes) => {
    let node = {
      nodeId: nodes.node_id,
      nodeName: nodes.title
    }
    this.state.options = []
    this.state.node = node
    this._hide()
    this.props.callBack(node)
  }
  render () {
    const {placeholder, width, title} = this.props
    const props = {
      filterOption: false,
      searchPlaceholder: placeholder
    }
    const treeProps = {
      needAll: this.props.needAll,
      title: title,
      receiveOrgnodes: this.state.orgNodes,
      getNodes: this._getNodes,
      handleTreeCancel: this._hide,
      visibleTree: this.state.visible,
      handleTreeOk: this._treeOk
    }
    if (this.props.nodeName && this.state.first) {
      this.state.first = false
      this.state.node.nodeName = this.props.nodeName
    }
    return <div>
      <Select combobox
        className='select-right-radius-0'
        id='org'
        style={{width: width}}
        {...props}
        onChange={this._searchOrg.bind(this)}
        onSelect={this._selectNodes}
        value={this.state.node.nodeName}
        searchPlaceholder={this.props.placeholder}>
        {this.state.options}
      </Select>
      <Button
        className='org-btn'
        onClick={this._show}>
          <div className='org-div'></div>
      </Button>
      <TreeModal
        ref='tree'
        {...this.props}
        {...treeProps}/>
    </div>
  }
}
