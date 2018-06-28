import React from 'react'
import {Button, Row, Col, Modal, Tree, message} from 'antd'
import i18n from 'i18n'
import autobind from 'core-decorators/lib/autobind'
const TreeNode = Tree.TreeNode
let treeNodeForLeaf = null
class TreeModal extends React.Component {
  static propTypes = {
    title: React.PropTypes.string,
    getNodes: React.PropTypes.func,
    handleTreeOk: React.PropTypes.func,
    handleTreeCancel: React.PropTypes.func,
    visibleTree: React.PropTypes.bool
  }

  constructor () {
    super()
    this.state = {
      treeData: [],
      newChild: [],
      selectAll: true,
      selectedKeys: ['']
    }
    this.loading = false
    this.node = undefined
    this.t = i18n.getFixedT(null, 'orgNodeSelect')
  }
  componentDidMount () {
    let that = this
    return that.timeout(1000).then(() => {
      let asyncTree = !!that.props.receiveOrgnodes.items ? that.props.receiveOrgnodes.items : []
      let treeData = []
      for (let elem of asyncTree) {
        elem.key = elem.node_id
        treeData.push(elem)
      }
      that.setState({
        treeData: treeData
      })
      return treeData
    })
  }
  @autobind
  timeout (duration = 0) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve.bind(this), duration)
    })
  }
  componentWillReceiveProps (nextProps) {
    if (!!nextProps.receiveOrgnodes) {
      return this.timeout(1000).then(() => {
        if (!!treeNodeForLeaf) {
          const child = !!nextProps.receiveOrgnodes.items ? nextProps.receiveOrgnodes.items : []
          let newChild = []
          for (let elem of child) {
            elem.key = elem.node_id
            newChild.push(elem)
          }
          let treeData = [...this.state.treeData]
          let a = function (data) {
            data.forEach((item) => {
              const isChild = ((node_id, org_id, leafProps) => {
                return newChild[0] && (node_id === leafProps.node_id || org_id === leafProps.org_id) &&
                  (node_id === newChild[0].parent_id || org_id === newChild[0].parent_id) &&
                  newChild.length > 0
              })(item.node_id, item.org_id, treeNodeForLeaf.props)

              if (item.children && item.children.length > 0) {
                item = a(item.children)
              } else if (isChild) {
                item.children = newChild
              }
            })
            return data
          }
          treeData = a(treeData)
          this.setState({
            treeData: treeData,
            newChild: newChild
          })
          this.loading = false
          return treeData
        }
      })
      nextProps.receiveOrgnodes = undefined
    }
  }

  @autobind
  handleDataLoaded (treeNode) {
    if (this.loading) {
      return null
    }
    treeNodeForLeaf = treeNode
    this.loading = true
    return this.timeout(1000).then(() => {
      this.props.getNodes({
        node_id: treeNode.props.node_id,
        org_id: treeNode.props.org_id
      })
    })
  }

  @autobind
  handleSelect (info, selectedKeys) {
    this.node = info.node.props
    this.setState({
      selectAll: false,
      selectedKeys: [this.node.eventKey]
    })
  }

  @autobind
  handleOk () {
    if (!this.node) {
      message.error(this.props.title)
      return
    }
    this.props.handleTreeOk(this.node)
  }

  @autobind
  handleCancel () {
    treeNodeForLeaf = null
    this.props.handleTreeCancel()
  }
  @autobind
  selectAllFun () {
    this.node = {
      title: this.t('all'),
      node_id: 0
    }
    this.setState({
      selectAll: true,
      selectedKeys: ['']
    })
  }

  render () {
    const { t } = this
    const loop = (data) => {
      return data.map((item) => {
        if (item.children) {
          return <TreeNode title={item.node_name || item.org_full_name} org_id={item.org_id} node_id={item.node_id} key={item.key}>{loop(item.children)}</TreeNode>
        } else {
          return <TreeNode title={item.node_name || item.org_full_name} org_id={item.org_id} node_id={item.node_id} key={item.key}></TreeNode>
        }
      })
    }
    const parseTreeNode = data => loop(data)
    let treeNodes = parseTreeNode(this.state.treeData)
    return (
      <div>
       <Modal title={this.props.title}
         className='tree-modal'
         visible={this.props.visibleTree}
         onCancel={this.handleCancel}
         footer={[<Row key={1}>
            <Col span='24' style={{textAlign: 'center'}}>
              <Button type='ghost'
                  size='large'
                  style={{marginRight: 30}}
                  onClick={this.handleCancel}>
                  {t('cancel')}
              </Button>
              <Button type='primary'
                    size='large'
                    onClick={this.handleOk}>
                {t('confirm')}
              </Button>
            </Col>
          </Row>
          ]}>
          <div className='modal-tree ant-tree' role='tree-node'>
            {
                this.props.needAll ?<li>
              <span className='ant-tree-switcher ant-tree-noline_open'></span>
               <a title={t('send.allUser')} className={this.state.selectAll ? 'ant-tree-node-selected' : ''} onClick={this.selectAllFun}>
                <span className='ant-tree-title'>{t('all')}</span>
              </a><ul className='ant-tree-child-tree ant-tree-child-tree-open' style={{display: 'block'}}>
                <Tree className=''
                  onDataLoaded={this.handleDataLoaded}
                  onSelect={this.handleSelect}
                  showLine={false}>
                  {treeNodes}
                </Tree>
              </ul>
            </li> : <ul className='ant-tree-child-tree ant-tree-child-tree-open' style={{display: 'block'}}>
                <Tree className=''
                  onDataLoaded={this.handleDataLoaded}
                  onSelect={this.handleSelect}
                  showLine={false}>
                  {treeNodes}
                </Tree>
              </ul>
            }
          </div>
        </Modal>
        </div>
      )
  }

}

export default TreeModal
