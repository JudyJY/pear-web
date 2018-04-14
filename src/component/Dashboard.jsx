import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Card } from 'antd'
import { fetchDashboard } from '../actions/index'
import CrawlerTasks from './CrawlerTasks'
import MainContainer from './container/MainContainer'

class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    this.props.fetchDashboard()
  }

  handleCreateCrawler = (index) => {
    const source = this.props.crawlers[index].source
    this.props.history.push('/crawler/' + source)
  }

  render() {
    const { crawlers, isFetching } = this.props

    return (
      <MainContainer>
        <div>
          <Card title="创建爬虫任务">
            {crawlers.map((e, index) => {
              return <Button key={index} type="primary" icon="plus" size="large" style={{ marginRight: 20 }} onClick={() => this.handleCreateCrawler(index)}>{e.name}</Button>
            })}
          </Card>
          <CrawlerTasks />
        </div>
      </MainContainer>
    )
  }
}

const mapStateToProps = (state) => {
  return Object.assign({}, state.dashborad)
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDashboard: () => {
      return dispatch(fetchDashboard())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)