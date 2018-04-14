import React, { Component } from 'react'
import { Layout, Menu, Icon, Avatar, Button, BackTop, Dropdown, message } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchUserInfo, logout } from '../../actions/index'
import config from '../../utils/config'

const { logo, footerText } = config
const { SubMenu } = Menu
const { Header, Content, Sider, Footer } = Layout

class MainContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loadingProgressBar: null,
            collapsed: false
        }
    }

    componentDidUpdate() {
        const { requestErrorMsg } = this.props;
        if (requestErrorMsg) {
            message.error(requestErrorMsg);
        }
    }

    componentWillMount() {
        const { uId } = this.props.user
        if (uId) {
            this.props.fetchUser(uId)
        }
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    handleMenuClick = (e) => {
        this.props.history.push(e.key);
    }

    handleLogout = () => {
        this.props.logout()
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    render() {
        const { children, user } = this.props
        return (
            <Layout style={{
                minHeight: '100vh'
            }} theme="light">
                <BackTop target={() => document.getElementById('content')} />
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.toggle}
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        left: 0,
                        background: '#fff'
                    }}
                    trigger={null}
                >
                    <div className="logo">
                        <img src={logo} alt="logo" />
                        {!this.state.collapsed && <span>Spider</span>}
                    </div>
                    <Menu theme="light"
                        defaultOpenKeys={['/crawlers', '/user']}
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
                <Layout style={{
                    height: '100vh',
                    overflow: 'scroll'
                }} id="content">
                    <Header style={{
                        padding: 0,
                        background: '#fff'
                    }}>
                        <div style={{
                            float: 'left'
                        }}>
                            <Button
                                className="trigger"
                                icon={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                                style={{
                                    marginLeft: 10,
                                    border: 'none',
                                    width: 48
                                }} />
                        </div>
                        {
                            user.id &&
                            <div style={{
                                textAlign: 'right',
                                paddingRight: '10px'
                            }}>
                                <Dropdown overlay={
                                    <Menu onClick={this.handleLogout}>
                                        <Menu.Item>
                                            注销
                      </Menu.Item>
                                    </Menu>
                                }>
                                    <Avatar>{user.name}</Avatar>
                                </Dropdown>
                            </div>
                        }

                    </Header>
                    <Content style={{
                        margin: "16px 0"
                    }}>
                        <div style={{
                            padding: 24,
                            minHeight: 360
                        }}>
                            {children}
                        </div>
                    </Content>
                    <Footer style={{
                        textAlign: 'center'
                    }}>
                        {footerText}
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

function mapStateToProps(state) {
    return state
}

function mapDispatchToProps(dispatch) {
    return {
        fetchUser: (uId) => {
            dispatch(fetchUserInfo(uId));
        },
        logout: () => {
            dispatch(logout());
        }
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainContainer))
