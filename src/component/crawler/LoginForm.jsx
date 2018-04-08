import React, { Component } from 'react'
import { Form, Icon, Input, Button, Row, Col } from 'antd'

const FormItem = Form.Item

class LoginForm extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onCommit(values)
      }
    })
  }

  handleGetCaptcha = (e) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onCaptcha(values)
      }
    })
  }

  handleGetPicCaptcha = (e) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onPicCaptcha(values)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { isLoadingSmsCode, isLoadingGetPic, needLoginPic, image_base64, isLogining } = this.props
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('mobile', {
            rules: [{ required: true, message: '请输入手机号!' }],
          })(
            <Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号" />
          )}
        </FormItem>
        {needLoginPic &&
          <FormItem>
            <Row gutter={12}>
              <Col span={12}>
                {getFieldDecorator('pic_code', {
                  rules: [{ required: false, message: '请输入图片验证码!' }],
                })(
                  <Input prefix={<Icon type="exception" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="图片验证码" />
                )}
              </Col>
              <Col span={12}>
                {image_base64 && <img src={image_base64} alt="captch_pic" />}
              </Col>
              <Col span={12}>
                <Button onClick={this.handleGetPicCaptcha} loading={isLoadingGetPic}>获取图片验证码</Button>
              </Col>
            </Row>
          </FormItem>
        }
        <FormItem>
          <Row gutter={12}>
            <Col span={12}>
              {getFieldDecorator('ele_sms_code', {
                rules: [{ required: false, message: '请输入验证码!' }],
              })(
                <Input placeholder="短信验证码" prefix={<Icon type="exception" style={{ color: 'rgba(0,0,0,.25)' }} />} />
              )}
            </Col>
            <Col span={12}>
              <Button onClick={this.handleGetCaptcha} loading={isLoadingSmsCode}>获取验证码</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button" loading={isLogining}>
            登录
          </Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(LoginForm)
