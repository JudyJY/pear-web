import React, { Component } from 'react'
import { Layout, Menu, Icon, Avatar } from 'antd'
import LoginForm from './Login'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { fetchLogin, fetchUserInfo } from '../actions'

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      loadingProgressBar: null,
      collapsed: false,
      currentMenu: ['1']
    }
    const { uId } = this.props.auth
    if (uId > 0) {
      this.props.fetchUser(uId)
    }
  }

  componentWillReceiveProps(nextProrps) {

  }

  toggle = () => {
    this.setState({collapsed: !this.state.collapsed})
  }

  handleMenuClick = (e) => {
    this.setState({currentMenu: [e.key]})
    this.props.history.push(e.key === '1' ? '/': e.key)
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

  handleClickAvatar = (e) => {
    this.setState({currentMenu: ['/user/info']})
    this.props.history.push('/user/info')
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    const { children, auth:{login}} = this.props
    const { currentMenu } = this.state
    return (
      <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.toggle}
      >
        <div className="logo">
          <p>Pear</p>
        </div>
        <Menu theme="dark" defaultSelectedKeys={currentMenu} selectedKeys={currentMenu} mode="inline" onClick={this.handleMenuClick}>
          <Menu.Item key="1">
            <Icon type="desktop" />
            <span>概览</span>
          </Menu.Item>
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
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          { login && <div style={{textAlign: 'right', paddingRight: '10px'}}><Link to='/user/info'><Avatar style={{ backgroundColor: '#87d068' }} icon="user"/></Link></div>}
        </Header>
        <Content style={{ margin: '16px 16px' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2016 Created by Ant UED
        </Footer>
        <LoginForm
          wrappedComponentRef={this.saveFormRef}
          visible={!login}
          onCancel={this.handleSignup}
          onCreate={this.handleLogin}
        />
      </Layout>
    </Layout>
    );
  }
}

function mapStateToProps(state) {
  return Object.assign({}, state)
}

function mapDispatchToProps(dispatch) {
  return {
    login: (user) => {
      dispatch(fetchLogin(user))
    },
    fetchUser: (uId) => {
      dispatch(fetchUserInfo(uId))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
