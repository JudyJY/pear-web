import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox, Row, Col, Layout, Menu, Breadcrumb } from 'antd'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import logo from '../../logo.svg'

class AuthContainer extends Component {
  render() {
    return <Layout className="layout" style={{
        height: '100vh'
      }}>
      <div style={{      	
        margin: 'auto auto',
        width: 420,
        padding: '20px 70px',
        minHeight: 280,
        background: 'rgba(255,255,255,.8)',
        boxShadow: '0 0 100px rgba(0,0,0,.08)',
        borderRadius: 4
      }}>
    <div style={{
        width: 280,
        height: 70,
        marginTop:10,
        background: 'rgba(255,0,0)'
      }}>LOGO</div>
        {this.props.children}
       </div>
      </Layout>
  }
}
export default AuthContainer