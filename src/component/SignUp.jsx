import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import logo from '../logo.svg'
import { fetchSignup } from '../actions/user'

const FormItem = Form.Item;


class SignUp extends Component {
  // 构造函数
  constructor(props) {
    super(props)
    this.state = {
      name: null,
      mobile: null,
      password: null,
      smsCode: null
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
    const {getFieldDecorator} = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('name', {
        rules: [{
          required: true,
          message: '请输入用户名!'
        }],
      })(
        <Input prefix={<Icon type="user" style={{
          color: 'rgba(0,0,0,.25)'
        }} />} placeholder="用户名" />
      )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('mobile', {
        rules: [{
          required: true,
          message: '请输入手机号!'
        }],
      })(
        <Input prefix={<Icon type="phone" style={{
          color: 'rgba(0,0,0,.25)'
        }} />} placeholder="手机号" />
      )}
        </FormItem>
        <FormItem>
          
      <Row gutter={24}>
          <Col span={18}>
              {getFieldDecorator('smsCode', {
        rules: [{
          required: true,
          message: '请输入验证码!'
        }],
      })(
        <Input prefix={<Icon type="key" style={{
          color: 'rgba(0,0,0,.25)'
        }} />} placeholder="验证码" />
      )}
            </Col>
            <Col span={6}>
              <Button>获取验证码</Button>
            </Col>
          </Row>
       
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
        {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true           
          })(
          <Checkbox>阅读并接受<a>《数据之道用户协议》</a></Checkbox>)}
        </FormItem>
        <FormItem>
           <Button type="primary" htmlType="submit" className="sign-form-button">注册</Button>
           <span style={{
        paddingLeft: 60
      }}></span>
           <Button type="primary" ghost className="login-form-button">登录</Button>
           { /*<a href="" style={{paddingLeft:10}}>已有账号，去登录</a>*/ }
        </FormItem>
      </Form>
      );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    signup: (user) => {
      dispatch(fetchSignup(user))
    }
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Form.create()(SignUp)))
