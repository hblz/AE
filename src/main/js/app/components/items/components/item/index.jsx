import React, { PropTypes } from 'react'
import classNames from 'classnames'
import i18n from 'i18n'
import { Checkbox, Validation, Form, Input, Tooltip } from 'antd'

const Validator = Validation.Validator
const FormItem = Form.Item

const noop = function () {}

const Item = React.createClass({
  mixins: [Validation.FieldMixin],

  propTypes: {
    style: PropTypes.shape({
      marginLeft: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]), /* 左边距 */
      marginRight: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]) /* 右边距 */
    }),
    item: PropTypes.object.isRequired, /* 数据 */
    id: PropTypes.string.isRequired, /* uid名称 */
    name: PropTypes.string.isRequired, /* 显示的文本名称 */
    checked: PropTypes.bool, /* 是否勾选 */
    editing: PropTypes.bool, /* 是否处于编辑状态 */
    onCheck: PropTypes.func, /* 勾选 */
    onEditing: PropTypes.func, /* 进入编辑状态 */
    inputRule: PropTypes.func, /* 编辑文本时文本校验规则 */
    onEdit: PropTypes.func, /* 修改 */
    onDel: PropTypes.func, /* 删除 */
    canDel: PropTypes.func /* 是否可删除 */
  },

  getDefaultProps () {
    return {
      style: {
        marginLeft: 0,
        marginRight: 0
      },
      checked: false,
      editing: false,
      onCheck: noop,
      onEditing: noop,
      inputRule: function (rule, value, callback) {
        callback()
      },
      onEdit: noop,
      onDel: noop,
      canDel: function () {
        return {
          canDel: true,
          cannotDel: false,
          cannotDelResson: ''
        }
      }
    }
  },

  getInitialState () {
    return {
      status: { value: {} },
      formData: { value: undefined }
    }
  },

  renderValidateStyle (item) {
    const formData = this.state.formData
    const status = this.state.status

    const classes = classNames({
      'error': status[item].errors,
      'validating': status[item].isValidating,
      'success': formData[item] && !status[item].errors && !status[item].isValidating
    })

    return classes
  },

  inputRule (rule, value, callback) {
    this.props.inputRule(rule, value, callback)
  },

  handleFormReset () {
    if (this.props.editing) {
      this.refs.validation.reset()
      this.setState(this.getInitialState())
    }
  },

  onEditing () {
    const { item, id, name } = this.props
    this.props.onEditing(item[id])
    this.setState({
      formData: {value: item[name]}
    })

    const that = this
    setTimeout(function () {
      if (that.refs.value) {
        const input = that.refs.value
        input.refs.input.focus()
        input.refs.input.selectionStart = item[name].length
        input.refs.input.selectionEnd = item[name].length
      }
    }, 100)
  },

  onSave (e) {
    e.preventDefault()
    const that = this
    const validation = that.refs.validation
    validation.validate((valid) => {
      if (!valid) {
        return false
      } else {
        const { item } = that.props
        that.props.onEdit(item, that.state.formData.value)
      }
    })
  },

  onDel () {
    this.props.onDel(this.props.item)
  },

  render () {
    const { item, name, checked, onCheck, editing, style } = this.props
    const { status, formData } = this.state
    const { cannotDel, cannotDelResson } = this.props.canDel(item)

    return <li className="item-box" style={style}>
      {
        cannotDel ? <Tooltip placement="bottom" title={cannotDelResson}>
          <span className="checkbox-disabled"></span>
        </Tooltip> : <Checkbox checked={checked} onChange={onCheck.bind(this, item)} />
      }
      {
        editing ? <span className="name-box">
          <Form inline onSubmit={this.onSave}>
            <Validation ref="validation" onValidate={this.handleValidate}>
              <FormItem
                id="value"
                validateStatus={this.renderValidateStyle('value')}
                help={status.value.errors ? status.value.errors.join(',') : null}
                required>
                  <Validator rules={[{ validator: this.inputRule }]} trigger="onChange">
                    <Input ref="value" name="value" id="value" type="text" value={formData.value} onBlur={this.onSave}/>
                  </Validator>
              </FormItem>
            </Validation>
          </Form>
        </span> : <span className="name-box">
          <span className="name" onClick={this.onEditing}>{item[name]}</span>
          {
            !cannotDel && <span className="del-icon" onClick={this.onDel}><span title={i18n.t('delete')} onClick={this.onDel}><span></span></span></span>
          }
        </span>
      }
    </li>
  }
})

export default Item
