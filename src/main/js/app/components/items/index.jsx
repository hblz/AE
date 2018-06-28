import React, { PropTypes } from 'react'
import './static/styles/index.scss'
import { Row, Col, Pagination, Checkbox, Icon } from 'antd'
import Item from './components/item/index'
import { Confirm } from 'components/dialog/index'
import i18n from 'i18n'
import './i18n'

const noop = function () {}

export default class extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    total: PropTypes.number.isRequired, /* 总数 */
    items: PropTypes.array.isRequired, /* 数据列表 */
    id: PropTypes.string.isRequired, /* uid名称 */
    name: PropTypes.string.isRequired, /* 显示的文本名称 */
    title: PropTypes.string, /* 数据名称 */
    fetch: PropTypes.func.isRequired, /* 获取数据 */
    handleCheck: PropTypes.func, /* 数据勾选状态改变通知 */
    inputRule: PropTypes.func, /* 编辑文本时文本校验规则 */
    onEdit: PropTypes.func, /* 修改 */
    onDelete: PropTypes.func, /* 删除 */
    canDelete: PropTypes.func /* 是否可删除 */
  }

  static defaultProps = {
    title: "数据",
    handleCheck: noop,
    inputRule: function (rule, value, callback) {
      callback()
    },
    onEdit: noop,
    onDelete: noop,
    canDelete: function () {
      return {
        canDel: true,
        cannotDel: false,
        cannotDelResson: ''
      }
    }
  }

  constructor () {
    super()
    this.t = i18n.getFixedT(null, 'items')
    this.state = {
      current: 1,
      itemsChecked: [],
      editingId: null,
      deleteItems: [],
      marginSize: 0
    }
    this.pageSize = 1 * 8
    this.getPageSize = this.getPageSize.bind(this)
  }

  componentDidMount () {
    this.getPageSize()
    window.addEventListener('resize', ::this.getPageSize)
  }

  componentWillReceiveProps (nextProps) {
    const { total } = nextProps
    const { current } = this.state
    const { pageSize } = this
    if (current > 1 && (current - 1) * pageSize >= total) {
      this.selectPage(current - 1)
    }
  }

  componentWillUnmount () {
    window.removeEventListener('resize', ::this.getPageSize)
  }

  getPageSize () {
    const marginSize = this.getMargin()
    this.setState({ marginSize })
    this.getList()
  }

  getMargin (rowNum, otherWidth) {
    const outerWidth = window.innerWidth - 242 > 1080 ? window.innerWidth - 242 : 1080
    let width = outerWidth - 35 * 2
    if (this.wrapper.parentNode.parentNode.parentNode.parentNode.offsetHeight < this.wrapper.parentNode.parentNode.parentNode.parentNode.scrollHeight) {
      width -= 10
    }
    if (rowNum) {
      rowNum--
      otherWidth += 200
    } else {
      rowNum = parseInt(width / 200)
      otherWidth = width % 200
    }
    this.pageSize = rowNum * 8
    const marginSize = otherWidth / (rowNum * 2 - 2)
    return marginSize < 15 ? this.getMargin(rowNum, otherWidth) : marginSize
  }

  getList (num) {
    const { total } = this.props
    const { current, deleteItems } = this.state
    const { pageSize } = this
    let currentPage = num || current
    if (currentPage > 1 && (currentPage - 1) * pageSize >= total - deleteItems.length) {
      currentPage--
    }
    this.props.fetch({
      $offset: (currentPage - 1) * pageSize,
      $limit: pageSize
    })
  }

  getPaginationProps () {
    return {
      total: this.props.total,
      current: this.state.current,
      pageSize: this.pageSize,
      onChange: ::this.selectPage
    }
  }

  selectPage (num) {
    num = num === undefined ? this.state.current : num
    this.getList(num)
    this.setState({
      current: num
    })
  }

  isChecked (item) {
    const { id } = this.props
    const { itemsChecked } = this.state
    return itemsChecked.filter(itemChecked => itemChecked[id] === item[id]).length > 0
  }

  onCheck (item) {
    const checked = this.isChecked(item)
    let { itemsChecked } = this.state
    let hasChangeCheck = false
    if (checked) {
      const { id } = this.props
      itemsChecked = itemsChecked.filter(itemChecked => itemChecked[id] !== item[id])
      hasChangeCheck = itemsChecked.length === 0
    } else {
      itemsChecked.push(item)
      hasChangeCheck = itemsChecked.length === 1
    }
    this.setState({ itemsChecked })

    hasChangeCheck && this.props.handleCheck(itemsChecked.length > 0)
  }

  onCheckAll () {
    let { items } = this.props
    items = items.filter(item => {
      const { canDel } = this.props.canDelete(item)
      return canDel
    })
    let { itemsChecked } = this.state
    if (items.length === itemsChecked.length) {
      itemsChecked = []
    } else {
      itemsChecked = items
    }
    this.setState({ itemsChecked })
    this.props.handleCheck(itemsChecked.length > 0)
  }

  isCheckedAll () {
    let { items } = this.props
    items = items.filter(item => {
      const { canDel } = this.props.canDelete(item)
      return canDel
    })
    const { itemsChecked } = this.state
    return items.length > 0 && items.length === itemsChecked.length
  }

  onEditing (id) {
    this.state.editingId && this.refs['item' + this.state.editingId] && this.refs['item' + this.state.editingId].handleFormReset()
    this.setState({
      editingId: id || null
    })
  }

  onEdit (item, value) {
    const { id, name } = this.props
    if (item[name] === value) {
      this.setState({
        editingId: null
      })
    } else {
      this.props.onEdit(item[id], value)
    }
  }

  onDel (item) {
    this.setState({
      deleteItems: item ? [item] : this.state.itemsChecked
    })
  }

  onDelete () {
    const { id } = this.props
    const { deleteItems } = this.state
    let ids = []
    for (let i = 0; i < deleteItems.length; i++) {
      ids.push(deleteItems[i][id])
    }
    ids.length > 0 && this.props.onDelete(ids)
  }

  cancelDelete () {
    this.setState({
      deleteItems: []
    })
  }

  render () {
    const that = this
    const paginationProps = this.getPaginationProps()
    const { t } = this
    const { items, total, id, name, children, title } = this.props
    const { editingId, deleteItems, marginSize } = this.state
    const rowNum = this.pageSize / 8
    return (
      <div className="items-area" ref={(c) => (this.wrapper = c)} style={{width: 200 * rowNum + marginSize * (rowNum * 2 - 2)}}>
        <div className="main-header">
          <Row>
            <Col className="col-12 btn-area">
              <div><label className="check-area" title={t('checkCurrentPage')}><Checkbox checked={this.isCheckedAll()} onChange={::this.onCheckAll} />{t('checkAll')}</label></div>
              {children}
            </Col>
            <Col className="col-12">
              <div className="total-number">
                {t('totalTip', {n: total, name: title})}
              </div>
            </Col>
          </Row>
        </div>
        {
          total > 0 ? <div className="items-body">
            <ul className="items-container">
            {
              items.map((item, key) => {
                const checked = that.isChecked(item)
                const itemProps = {
                  style: {
                    marginLeft: key % rowNum === 0 ? 0 : `${marginSize}px`,
                    marginRight: key % rowNum === rowNum - 1 ? 0 : `${marginSize}px`
                  },
                  item,
                  id,
                  name,
                  checked,
                  editing: item[id] === editingId,
                  onCheck: ::that.onCheck,
                  onEditing: ::that.onEditing,
                  inputRule: ::that.props.inputRule,
                  onEdit: ::that.onEdit,
                  onDel: ::that.onDel,
                  canDel: ::that.props.canDelete
                }
                return <Item ref={'item' + item[id]} key={item[id]} {...itemProps} />
              })
            }
            <div className="clear-area"></div>
            </ul>
            <div className="items-pagination">
              <Pagination {...paginationProps} />
            </div>
            <Confirm visible={deleteItems.length > 0}
              onOk={::this.onDelete}
              onCancel={::this.cancelDelete}
              width="400">
              <div style={{textAlign: 'center'}} dangerouslySetInnerHTML={{__html: t('confirmDelete', {name: deleteItems.length === 1 ? deleteItems[0][name] : (deleteItems.length === 0 ? '' : t('checked', {name: title}))})}} />
            </Confirm>
          </div> : <div className="items-body" style={{background: 'red'}}><div className="ant-table-placeholder"><Icon type="frown" />{t('noData')}</div></div>
        }
      </div>
    )
  }
};
