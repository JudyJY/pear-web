import React, {Component} from 'react'
import {connect} from 'react-redux'
import { List, Avatar, Button, Spin, Card, Table, Tag } from 'antd'
import {fetchCrawlerTasks} from '../actions/crawlerTaskAction'

const columns = [
  {
    title: '任务编号',
    dataIndex: 'id',
    key: 'id'
  }, {
    title: '爬虫类型',
    dataIndex: 'type',
    key: 'type'
  }, {
    title: '爬取平台',
    dataIndex: 'source',
    key: 'source'
  }, {
    title: '爬取总量',
    dataIndex: 'total',
    key: 'total'
  }, {
    title: '当前爬取量',
    dataIndex: 'current',
    key: 'current'
  }, {
    title: '状态',
    key: 'status',
    render: (text, record) => (
      <div>
        {record.status === 1 && <Tag color="#108ee9">完成</Tag>}
        {record.status === 0 && <Tag color="#87d068">进行中</Tag>}
        {record.status === -1 && <Tag color="rgb(246, 152, 153)">失败</Tag>}
      </div>
    )
  }, {
    title: '进度',
    key: 'process',
    render: (text, record) => (<span>{record.current / record.total * 100}%</span>)
  }
]

class CrawlerTasks extends Component{

  constructor(props){
    super(props)
    this.state = {

    }
  }

  componentWillMount(){
    this.props.fetchCrawlerTasks()
  }

  render() {
    const {isFetching} = this.props
    const crawler_tasks_data = []
    return (
      <div>
      <Card loading={isFetching} hoverable title="爬虫任务列表" bordered={true} style={{ width: '100%', marginTop: 20 }}>
        <Table columns={columns} dataSource={crawler_tasks_data} size="middle" loading={isFetching}/>
      </Card>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return Object.assign({}, state.crawlerTasks)
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCrawlerTasks: (data) => {
      return dispatch(fetchCrawlerTasks(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CrawlerTasks)
