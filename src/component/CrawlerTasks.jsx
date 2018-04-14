import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Card, Table, Tag, Icon, Progress, Pagination } from 'antd'
import { fetchCrawlerTasks } from '../actions/crawlerTaskAction'
import CRAWLER_TYPES from '../consts/crawlers'

const columns = [
  {
    title: '任务编号',
    dataIndex: 'id',
    key: 'id'
  }, {
    title: '爬虫类型',
    dataIndex: 'type',
    key: 'type',
    render: (text) => (
      CRAWLER_TYPES[text]
    )
  }, {
    title: '爬取总量',
    dataIndex: 'total',
    key: 'total'
  }, {
    title: '当前爬取量',
    dataIndex: 'count',
    key: 'count'
  }, {
    title: '进度',
    key: 'process',
    render: (text, record) => (<span>
      {<Progress
        percent={record.total > 0 ? record.count / record.total * 100 : 100}
        status={(record.total === 0 && 'exception') || (record.status === -1 && 'exception') || (record.status === 0 && 'active') || (record.status === 1 && 'success')}
      />}
      {record.status === 1 && <Button>分析数据<Icon type="right" /></Button>}
    </span>)
  }
]

class CrawlerTasks extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentPage: 1,
      pageSize: 10
    }
  }

  componentWillMount() {
    const { currentPage } = this.state
    const payload = {
      page: currentPage,
      per_page: 10
    }
    this.props.fetchCrawlerTasks(payload)
  }

  fetchTasks = (page, pageSize) => {
    const payload = {
      page: page,
      per_page: pageSize
    }
    this.props.fetchCrawlerTasks(payload)
  }

  handleTablePageChange = (page, pageSize) => {
    this.setState({
      currentPage: page
    })
    this.fetchTasks(page, pageSize)
  }

  handleTableSizeChange = (current, pageSize) => {
    this.setState({
      pageSize: pageSize,
      currentPage: 1
    })
    this.fetchTasks(1, pageSize)
  }

  render() {
    const { isFetching, data, total } = this.props
    const { currentPage, pageSize } = this.state
    const crawler_tasks_data = data || []
    const pagination = {
      total: total || 0,
      showSizeChanger: true,
      pageSize: pageSize,
      current: currentPage,
      onChange: this.handleTablePageChange,
      onShowSizeChange: this.handleTableSizeChange
    }
    return (
      <div>
        <Card loading={isFetching} hoverable title="爬虫任务列表" bordered={true} style={{ width: '100%', marginTop: 20 }}>
          <Table columns={columns}
            dataSource={crawler_tasks_data}
            size="middle" loading={isFetching}
            expandedRowRender={record =>
              <div>
                <p>{record.args}</p>
                <p>{record.extras}</p>
                <p>{record.info}</p>
              </div>
            }
            pagination={pagination}
          />
        </Card>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return state.crawlerTasks
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCrawlerTasks: (data) => {
      return dispatch(fetchCrawlerTasks(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CrawlerTasks)
