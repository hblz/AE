import React from 'react'
import { Button, Form, Input} from 'antd'
import i18n from 'i18n'

const FormItem = Form.Item;
class LoginForm extends React.Component {

  handleSubmit(e) {
    e.preventDefault();
  }


  render() {
    const { getFieldDecorator } = this.props.form
    const t = i18n.getFixedT(null, 'login');
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
          <FormItem>
            <i className="iconfont icon-account"/>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入账号' }],
            })(
              <Input name="name" id="name" placeholder={t('account')}
                     onChange={this.setField.bind(this, 'name')}/>
            )}
          </FormItem>

          <FormItem>
            <i className="iconfont icon-password"/>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: t('enterPwd') }],
            })(
              <Input type="password" name="password" placeholder={t('pwd')} autoComplete="off"/>
            )}
          </FormItem>

          <FormItem>
            <Button type="primary" htmlType="submit">{t('login')}</Button>
          </FormItem>
      </Form>
    );
  }
}
const Form = Form.create()(LoginForm)
export default Form