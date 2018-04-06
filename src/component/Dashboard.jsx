import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Table, Card, Tag  } from 'antd'
import {fetchDashboard} from '../actions'

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
    this.props.history.push('/crawler/'+source)
  }

  render() {
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
    const {crawlers, crawler_tasks, analyse_tasks, isFetching} = this.props
    const crawler_tasks_data = crawler_tasks.map((e,index) => {
      return Object.assign({}, e, {key: index})
    })
    const analyse_tasks_data = analyse_tasks.map((e,index) => {
      return Object.assign({}, e, {key: index})
    })

    return (
      <div>
        <Card title="创建爬虫任务">
          {crawlers.map((e,index) => {
            return <Button key={index} type="primary" icon="plus" size="large" style={{marginRight: 20}} onClick={()=>this.handleCreateCrawler(index)}>{e.name}</Button>
          })}
        </Card>
        <Card loading={isFetching} hoverable title="爬虫任务列表" bordered={true} style={{ width: '100%', marginTop: 20 }}>
          <Table columns={columns} dataSource={crawler_tasks_data} size="middle" loading={isFetching}/>
        </Card>
        <Card loading={isFetching} hoverable title="数据分析任务列表" bordered={true} style={{ width: '100%' , marginTop: 20 }}>
          <Table columns={columns} dataSource={analyse_tasks_data} size="middle" loading={isFetching}/>
        </Card>
      </div>
    );
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
