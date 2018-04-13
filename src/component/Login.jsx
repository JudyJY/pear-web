import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox, Row, Col, Layout, Menu, Breadcrumb } from 'antd'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import logo from '../logo.svg'
import { fetchSignup } from '../actions/user'
import AuthContainer from './Auth/AuthContainer'

const FormItem = Form.Item;

class Login extends Component {
  // 构造函数
  constructor(props) {
    super(props)
    this.state = {
      account: null,
      password: null,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }


  render() {
    const {getFieldDecorator} = this.props.form
    return (
      <AuthContainer>
        <Form onSubmit={this.handleSubmit} className="login-form" style={{
          marginTop: 20
        }}>
          <FormItem>
            {getFieldDecorator('account', {
          rules: [{
            required: true,
            message: '请输入用户名/手机号'
          }],
        })(
          <Input prefix={<Icon type="user" style={{
            color: 'rgba(0,0,0,.25)'
          }} />} placeholder="用户名/手机号" />
        )}
          </FormItem>
          <FormItem>
          {getFieldDecorator('password', {
          rules: [{
            required: true,
            message: '请输入密码!'
          }],
        })(
          <Input prefix={<Icon type="lock" style={{
            color: 'rgba(0,0,0,.25)'
          }} />} type="password" placeholder="密码" />
        )}
          </FormItem>
          <FormItem>
             <Button type="primary" htmlType="submit" className="sign-form-button" style={{
          width: '76%'
        }}>登录</Button>
             <span style={{
          paddingLeft: 28
        }}></span>
             { /*<Button type="primary" ghost className="login-form-button">登录</Button>*/ }
             <Link to="/signup" style={{
          paddingLeft: 10
        }}>注册</Link>
          </FormItem>
        </Form>
      </AuthContainer>
    )
  }
}




function mapDispatchToProps(dispatch) {
  return {
    login: (user) => {
      dispatch(fetchSignup(user))
    }
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Form.create()(Login)))