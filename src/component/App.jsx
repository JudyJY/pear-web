import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class App extends Component {

    render() {
        const { children } = this.props
        return (children)
    }
}

const mapState = (state) => {
    return { state }
}

const mapDispatch = (dispath) => {
    return { dispath }
}

export default withRouter(connect(mapState, mapDispatch)(App))
