import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import { Row, Col, Card, List, Avatar, Button, Table, Divider, Progress, Icon, Spin } from 'antd';
import { Radar } from 'components/Charts';
import EditableLinkGroup from 'components/EditableLinkGroup';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { APP_NAME, CRAWLER_TYPES } from '../../utils/const';
import ReactEcharts from 'echarts-for-react';
import WaterWave from '../../components/Charts/WaterWave'

import styles from './Workplace.less';

@connect(({ activities, loading, user }) => ({
  activities: activities,
  activitiesLoading: loading.effects['activities/fetchList'],
  user: user.currentUser,
}))
export default class Workplace extends PureComponent {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'activities/fetchList'
    });
    dispatch({
      type: 'activities/fetchCompareAllData'
    })
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: true
    })
  }

  handleCreateEleCrawler = () => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/configCrawler/ele'));
  };

  handleCreateMeituanCrawler = () => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/configCrawler/meituan'));
  };

  render() {
    const { activitiesLoading, user, dispatch } = this.props;
    const { visitor_count, used_days } = user;
    const { crawlers, actions, compareData } = this.props.activities;
    const crawlers_data = crawlers.data
      ? crawlers.data.map((value, index) => {
        return {
          ...value,
          key: index,
        };
      })
      : [];

    const pageHeaderContent = (
      <div className={styles.pageHeaderContent}>
        <div className={styles.avatar}>
          <Avatar
            className="avatar"
            style={{ backgroundColor: '#87d068', verticalAlign: 'middle', lineHeight: 4 }}
            icon="user"
            src=""
          />
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>
            亲爱的 <span style={{ color: '#1890ff' }}>{user && user.name}</span> ，欢迎回来！
          </div>
          <div>
            今天是你使用{APP_NAME}的第 <span style={{ color: '#1890ff' }}>{used_days}</span>{' '}
            天，使用愉快！
          </div>
        </div>
      </div>
    );
    const extraContent = (
      <div className={styles.extraContent}>
        <div className={styles.statItem}>
          <p>爬虫数</p>
          <p>{crawlers.crawler_total ? crawlers.crawler_total : 0}</p>
        </div>
        <div className={styles.statItem}>
          <p>累计访问次数</p>
          <p>{visitor_count ? visitor_count : 0}</p>
        </div>
      </div>
    );
    const crawlerColumns = [
      { title: '序号', dataIndex: 'id', key: 'id' },
      {
        title: '爬取平台',
        dataIndex: 'type',
        key: 'source',
        render: text => <p>{text % 2 == 0 ? '美团外卖' : '饿了么'}</p>,
      },
      {
        title: '商家名称',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => (
          <p>
            <a href="#"> {record.restaurant && record.restaurant.name}</a>{' '}
          </p>
        ),
      },
      { title: '爬取数据量', dataIndex: 'count', key: 'count' },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => (
          <div>
            {record.status === 0 ? (
              <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />
            ) : (
                <Progress
                  type="circle"
                  showInfo={true}
                  percent={100}
                  width={30}
                  status={record.status === 2 ? 'exception' : 'success'}
                />
              )}
          </div>
        ),
      },
      {
        title: '创建--完成时间',
        dataIndex: 'finished',
        key: 'finished',
        render: (text, record) => {
          return (
            <div>
              {record.created}
              <div>
                <Icon type="arrow-down" />
              </div>
              {record.finished}
            </div>
          );
        },
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (_, record) => (
          <div>
            <Button
              disabled={record.status !== 1}
              onClick={() => {
                dispatch(routerRedux.push(`/analy/normal/${record.id}`));
              }}
              type="primary"
            >
              查看
            </Button>
          </div>
        ),
      },
    ];

    const restaurantOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['月销量', '评分', '商品数', '起送费', '送达时间']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value'
      },
      yAxis: {
        type: 'category',
        data: Object.keys(compareData)
      },
      series: [
        {
          name: '月销量',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: Object.keys(compareData).map(key => {
            return compareData[key].sales
          })
        },
        {
          name: '评分',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: Object.keys(compareData).map(key => {
            return compareData[key].score
          })
        },
        {
          name: '商品数',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: Object.keys(compareData).map(key => {
            return compareData[key].dish_total
          })
        },
        {
          name: '起送费',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: Object.keys(compareData).map(key => {
            return compareData[key].send_fee
          })
        },
        {
          name: '送达时间',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: Object.keys(compareData).map(key => {
            return compareData[key].arrive_time
          })
        }
      ]
    }

    return (
      <PageHeaderLayout content={pageHeaderContent} extraContent={extraContent}>
        <Row gutter={24}>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.card_contentBtn}
              style={{ marginBottom: 24 }}
              bordered={false}
              bodyStyle={{ padding: 0 }}
            >
              <Button
                className={styles.card_BtnE}
                type="default"
                icon="plus"
                onClick={this.handleCreateEleCrawler}
              >
                新建饿了么爬虫
              </Button>
            </Card>
            <Card
              className={styles.card_contentBtn}
              style={{ marginBottom: 24 }}
              bordered={false}
              bodyStyle={{ padding: 0 }}
            >
              <Button
                className={styles.card_BtnM}
                type="default"
                icon="plus"
                onClick={this.handleCreateMeituanCrawler}
              >
                新建美团外卖爬虫
              </Button>
            </Card>

            <Card bodyStyle={{ textAlign: "center" }} loading={activitiesLoading}>
              <WaterWave
                loading={activitiesLoading}
                title="爬虫任务完成"
                height={200}
                percent={(crawlers.done_total / crawlers.crawler_total * 100).toFixed(1)}
              />
            </Card>
          </Col>
          <Col xl={18} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{ marginBottom: 24 }}
              title="爬虫列表"
              bordered={false}
              extra={<Link to="/dashboard/monitor">更多操作</Link>}
              loading={activitiesLoading}
              bodyStyle={{ padding: 32 }}
            >
              <Table
                columns={crawlerColumns}
                dataSource={crawlers_data}
                pagination={{ pageSize: 5 }} />
            </Card>
          </Col>
        </Row>
        <Row style={{ marginTop: 20 }}>
          <Card bodyStyle={{ maxHeight: 500 }} title="商家整体数据">
            <ReactEcharts option={restaurantOption} />
          </Card>
        </Row>
        <Row style={{ marginTop: 20 }}>
          <Card bodyStyle={{ maxHeight: 500, overflow: 'auto' }} title="操作记录">
            <List
              dataSource={actions.data}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        style={{ backgroundColor: '#87d068' }}
                        icon="user" />}
                    title={`${item.action_name}`}
                    description={`${item.created} ${item.action_args || ''}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Row>
      </PageHeaderLayout>
    );
  }
}
