import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { fetchSignup } from '../actions/user'
import AuthContainer from './container/AuthContainer'

const FormItem = Form.Item;

class Signup extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.signup({
                    name: values.name,
                    mobile: values.mobile,
                    password: values.password,
                    smsCode: values.smsCode
                });
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        const { signupSccess } = nextProps;
        if (signupSccess) {
            this.props.history.push('/login');
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { isFetching } = this.props;
        return (
            <AuthContainer>
                <Form onSubmit={this.handleSubmit} className="login-form" style={{
                    marginTop: 20
                }}>
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
                        <Row gutter={16}>
                            <Col span={14}>
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
                            <Col span={8}>
                                <Button style={{
                                    marginLeft: 6
                                }}>获取验证码</Button>
                            </Col>
                        </Row>

                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true
                        })(
                            <Checkbox>阅读并接受<a href="#">《数据之道用户协议》</a></Checkbox>)}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="sign-form-button" loading={isFetching} style={{
                            width: '76%'
                        }}>注册</Button>
                        <span style={{
                            paddingLeft: 28
                        }}></span>
                        <Link to="/login" style={{ paddingLeft: 10 }}>登录</Link>
                    </FormItem>
                </Form>
            </AuthContainer>
        );
    }
}


function mapStateToProps(state) {
    return state.user
}

function mapDispatchToProps(dispatch) {
    return {
        signup: (user) => {
            dispatch(fetchSignup(user))
        }
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(Signup)))
