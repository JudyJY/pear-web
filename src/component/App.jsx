import React, { Component } from 'react'
import { Layout, Menu, Icon, Avatar, Button, BackTop, Dropdown, message } from 'antd'
import LoginForm from './Login'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchLogin, fetchUserInfo, logout } from '../actions/index'
import logo from '../logo.svg'

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingProgressBar: null,
      collapsed: false
    }
    const { uId } = this.props
    if (uId > 0) {
      this.props.fetchUser(uId)
    }
  }

  componentDidUpdate() {
    const { requestErrorMsg } = this.props
    if (requestErrorMsg) message.error(requestErrorMsg)
  }

  toggle = () => {
    this.setState({ collapsed: !this.state.collapsed })
  }

  handleMenuClick = (e) => {
    this.props.history.push(e.key)
  }

  handleSignup = (e) => {
    this.props.history.push('/signup')
  }

  handleLogin = (e) => {
    this.formRef.props.form.validateFields((err, values) => {
      if (!err) {
        const user = {
          account: values.account,
          password: values.password
        }
        this.props.login(user)
      }
    })
  }

  handleLogout = () => {
    this.props.logout()
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    const { children, logined, name, isFetching, requestErrorMsg } = this.props
    return (
      <Layout style={{ minHeight: '100vh' }} theme="light">
        <BackTop target={() => document.getElementById('content')} />
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.toggle}
          style={{ overflow: 'auto', height: '100vh', left: 0, background: '#fff' }}
          trigger={null}
        >
          <div className="logo">
            <img src={logo} alt="logo" />
            {!this.state.collapsed && <span>Spider</span>}
          </div>
          <Menu theme="light"
            defaultOpenKeys={['/crawlers','/user']}
            defaultSelectedKeys={[this.props.location.pathname]}
            selectedKeys={[this.props.location.pathname]}
            mode="inline" onClick={this.handleMenuClick}>
            <Menu.Item key="/dashborad">
              <Icon type="dashboard" />
              <span>概览</span>
            </Menu.Item>
            <SubMenu
              key="/crawlers"
              title={<span><Icon type="rocket" /><span>爬虫</span></span>}>
              <Menu.Item key="/crawler/ele">饿了么爬虫</Menu.Item>
              <Menu.Item key="/crawler/meituan">美团爬虫</Menu.Item>
            </SubMenu>
            <Menu.Item key="/task">
              <Icon type="desktop" />
              <span>任务进度</span>
            </Menu.Item>
            <SubMenu
              key="/user"
              title={<span><Icon type="user" /><span>个人中心</span></span>}
            >
              <Menu.Item key="/user/history">操作记录</Menu.Item>
              <Menu.Item key="/user/info">信息修改</Menu.Item>
            </SubMenu>
            <Menu.Item key="/about">
              <Icon type="file" />
              <span>关于我们</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ height: '100vh', overflow: 'scroll' }} id="content">
          <Header style={{ padding: 0, background: '#fff' }}>
            <div style={{ float: 'left' }}>
              <Button
                className="trigger"
                icon={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
                style={{ marginLeft: 10, border: 'none', width: 48 }} />
            </div>
            {logined &&
              <div style={{ textAlign: 'right', paddingRight: '10px' }}>
                <Dropdown overlay={
                  <Menu onClick={this.handleLogout}>
                    <Menu.Item>
                      注销
                    </Menu.Item>
                  </Menu>
                }>
                  <Avatar>{name}</Avatar>
                </Dropdown>
              </div>
            }
          </Header>
          <Content style={{ margin: "16px 0" }}>
            <div style={{ padding: 24, minHeight: 360 }}>
              {logined && children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
        </Footer>
          <LoginForm
            wrappedComponentRef={this.saveFormRef}
            visible={!logined}
            onCancel={this.handleSignup}
            onCreate={this.handleLogin}
            isFetching={isFetching}
          />
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return Object.assign({}, { ...state.user, ...state.comm })
}

function mapDispatchToProps(dispatch) {
  return {
    login: (user) => {
      dispatch(fetchLogin(user))
    },
    fetchUser: (uId) => {
      dispatch(fetchUserInfo(uId))
    },
    logout: () => {
      dispatch(logout())
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
