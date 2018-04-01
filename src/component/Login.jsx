import { Modal, Form, Input, Icon } from 'antd'
import React from 'react'

const FormItem = Form.Item;

const LoginForm = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="请先登录"
          okText="登录"
          cancelText="立即注册"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem>
              {getFieldDecorator('account', {rules: [{ required: true, message: '输入不能为空'}]})(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名/邮箱/手机号" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {rules: [{ required: true, message: '密码不能为空'}]})(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
            )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

export default LoginForm