import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { fetchLogin } from '../actions/user'
import AuthContainer from './container/AuthContainer'
import cookie from 'react-cookies'

const FormItem = Form.Item

class Login extends Component {

    componentWillReceiveProps(nextProps) {
        const { uId } = nextProps
        if (uId) {
            this.props.history.push('/dashborad')
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.login({
                    account: values.account,
                    password: values.password
                })
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const { isFetching } = this.props
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
                        <Button type="primary" htmlType="submit" className="sign-form-button" loading={isFetching} style={{
                            width: '76%'
                        }}>登录</Button>
                        <span style={{
                            paddingLeft: 28
                        }}></span>
                        <Link to="/signup" style={{ paddingLeft: 10 }}>注册</Link>
                    </FormItem>
                </Form>
            </AuthContainer>
        )
    }
}


function mapStateToProps(state) {
    return state.user
}

function mapDispatchToProps(dispatch) {
    return {
        login: (user) => {
            dispatch(fetchLogin(user))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(Login)))