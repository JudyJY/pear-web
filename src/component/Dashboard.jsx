import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Table, Icon, Divider, Card } from 'antd'
import {fetchDashboard} from '../actions'

class Dashboard extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.fetchDashboard()
  }

  render() {
    const columns = [
      {
        title: '任务编号',
        dataIndex: 'id',
        key: 'id',
        render: text => <a href="#">{text}</a>
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
        render: (text, record) => (<span>{record.status > 0 ? <Icon type="check" >完成</Icon> : <Icon type="loading" >进行中</Icon>}</span>)
      }, {
        title: '进度',
        key: 'process',
        render: (text, record) => (<span>{record.current / record.total * 100}%</span>)
      }
    ]

    const data = this.props.tasks.map((e,index)=>{
      return Object.assign({}, e, {key: index})
    })
    const {crawlers} = this.props

    return (
      <div>
        <Card title="爬虫任务列表" bordered={true} style={{ width: '100%' }}>
          <Table columns={columns} dataSource={data} size="middle" loading={this.props.isFetching}/>
        </Card>
        <Card title="数据分析任务列表" bordered={true} style={{ width: '100%' , marginTop: 20 }}>
          <Table columns={columns} dataSource={data} size="middle" loading={this.props.isFetching}/>
        </Card>
        <div style={{ marginTop: 20 }}>
          <Card title="创建爬虫任务">
            {crawlers.map((e,index) => {
              return <Button key={index} type="primary" icon="plus" size="large" style={{marginRight: 20}}>{e.name}</Button>
            })}
          </Card>
        </div>
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
