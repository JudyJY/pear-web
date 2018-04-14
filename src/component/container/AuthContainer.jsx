import React, { Component } from 'react'
import {Layout} from 'antd'

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