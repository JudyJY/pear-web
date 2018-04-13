import { Button, Modal, Form, Input, Icon } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import fetchLogin from '../actions/user'

const FormItem = Form.Item;

const LoginForm = Form.create()(
  class extends React.Component {

    handleSubmit = (e) => {
      e.preventDefault()
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      })
    }

    render() {
      const { visible, onCancel, onCreate, form, isFetching } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('account', { rules: [{ required: true, message: '输入不能为空' }] })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名/邮箱/手机号" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', { rules: [{ required: true, message: '密码不能为空' }] })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">登录</Button>
          </FormItem>
        </Form>
      )
    }
  }
)

const dispatch = (dispatch) => {
  return {
    ...dispatch
  }
}

export default connect(null, dispatch)(LoginForm)