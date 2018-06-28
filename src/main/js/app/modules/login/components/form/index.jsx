import React from 'react'
import { Button, Form, Input } from 'antd'
import i18n from 'i18n'
import PropTypes from 'prop-types'

const FormItem = Form.Item
class LoginForm extends React.Component {
  static propTypes = {
    getFieldDecorator: PropTypes.func,
    callBack: PropTypes.func,
    form: PropTypes.object
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.callBack(values)
        console.log('Received values of form: ', values)
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const t = i18n.getFixedT(null, 'login')
    return (
      <Form onSubmit={this.handleSubmit}>
          <FormItem>
            <i className='iconfont icon-account'/>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入账号' }]
            })(
              <Input name='name' id='name' placeholder={t('account')} />
            )}
          </FormItem>

          <FormItem>
            <i className='iconfont icon-password'/>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: t('enterPwd') }]
            })(
              <Input type='password' name='password' placeholder={t('pwd')} autoComplete='off'/>
            )}
          </FormItem>

          <FormItem>
            <Button type='primary' htmlType='submit'>{t('login')}</Button>
          </FormItem>
      </Form>
    )
  }
}
const Forms = Form.create()(LoginForm)
export default Forms
