import React, { Component } from 'react'
import { Tag, Collapse, Table, Card, Input, Button, Modal, List, Spin, Icon, AutoComplete, message } from 'antd'

const restaurantColumns = [
    {
        title: '店名',
        dataIndex: 'name',
        width: 150
    }, {
        title: '评分',
        dataIndex: 'rating',
        width: 100
    }, {
        title: '配送费',
        dataIndex: 'float_delivery_fee',
        width: 120
    }, {
        title: '评价配送时间(分钟)',
        dataIndex: 'order_lead_time',
        width: 150
    }, {
        title: '店铺图标',
        dataIndex: 'image_path',
        render: text => <img style={{ width: 70 }} alt={text} src={`http://fuss10.elemecdn.com/${text}.${text.substring(32, text.length)}`} />,
        width: 100
    }, {
        title: '地址',
        dataIndex: 'address'
    }
]

const configPanelStyle = {
    background: 'white',
    borderRadius: 0,
    marginTop: 24,
    border: 0,
    overflow: 'hidden',
}

export default class CrawlerConfig extends Component {

    constructor(props) {
        super(props)
        this.state = {
            addressModalVisible: false,
            selectedAddress: null,
            restaurantsOffset: 0,
            restaurantsLimit: 24,
            matchRestaurants: [],
            selectedRestaurants: []
        }
    }

    handleSearch = (value) => {
        if (!value || value.length < 1) {
            message.error('输入为空')
            return
        }
        this.props.searchEleAddress(value)
        this.setState({ addressModalVisible: true })
    }

    onSelectAddress = (value) => {
        this.setState(Object.assign({}, this.state, {
            addressModalVisible: false,
            selectedAddress: value,
            restaurantsOffset: 0,
            restaurantsLimit: 24
        }), () => {
            this.fetchEleRestaurants()
        })
    }

    onSelectRestaurants = (selectedRowKeys, selectedRows) => {
        this.setState(Object.assign({}, this.state, {
            selectedRestaurants: selectedRows
        }))
    }

    fetchEleRestaurants = () => {
        const { selectedAddress, restaurantsOffset, restaurantsLimit } = this.state
        const payload = {
            geohash: selectedAddress.geohash,
            latitude: selectedAddress.latitude,
            longitude: selectedAddress.longitude,
            offset: restaurantsOffset,
            limit: restaurantsLimit
        }
        this.props.fetchEleRestaurants(payload)
    }

    handleSearchRestaurants = (value) => {
        if (!value || value.length < 1) {
            return
        }
        const { restaurants } = this.props
        const matchRestaurants = restaurants.filter(item => {
            if (item.name.indexOf(value) > -1) {
                return item
            }
        })
        this.setState(Object.assign({}, this.state, { matchRestaurants: matchRestaurants }))
    }

    selectMatchRestaurants = () => {

    }

    render() {
        const { isSearchEleAddress, address, restaurants, isFetchingRastaurants } = this.props
        const { selectedAddress, matchRestaurants, selectedRestaurants } = this.state
        const rowSelection = { onChange: this.onSelectRestaurants }
        return (
            <div>
                <Collapse
                    defaultActiveKey={['configAddress']}
                    activeKey={
                        selectedAddress ? ['configRestaurant', 'configAddress'] : 'configAddress'
                    }
                    bordered={false}>
                    <Collapse.Panel
                        header={<h2>1 确定商圈</h2>}
                        key="configAddress"
                        disabled={selectedAddress ? true : false}
                        style={configPanelStyle}>
                        <div>
                            <div>
                                <Input.Search
                                    placeholder={"输入搜索地点"}
                                    onSearch={this.handleSearch}
                                    enterButton />
                                <Modal
                                    title="选择地点"
                                    visible={this.state.addressModalVisible}
                                    footer={null}
                                    closable
                                    destroyOnClose>
                                    <div style={{ maxHeight: 300, overflow: 'auto' }}>
                                        {address ?
                                            <List
                                                itemLayout="horizontal"
                                                dataSource={address}
                                                renderItem={item => (
                                                    <List.Item>
                                                        <List.Item.Meta
                                                            title={<Button key={item.id} value={item} onClick={() => this.onSelectAddress(item)}>{item.name}</Button>}
                                                            description={item.address}
                                                        />
                                                    </List.Item>
                                                )}
                                            /> : <Spin spinning={isSearchEleAddress} indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />}
                                    </div>
                                </Modal>
                            </div>
                            <div style={{ marginTop: 10 }} >
                                {selectedAddress && <div>在 <span style={{ color: 'red' }}>{selectedAddress.name}</span> 附近,有 <span style={{ color: 'blue' }}>{selectedAddress.count}</span> 家商店。</div>}
                            </div>
                        </div>
                    </Collapse.Panel>
                    <Collapse.Panel header={<h2 style={{ color: selectedAddress ? 'black' : 'grey' }}>2 选取将爬取的商家</h2>}
                        key="configRestaurant"
                        disabled={selectedAddress ? false : true}
                        style={configPanelStyle}>
                        {!selectedAddress &&
                            <div style={{ textAlign: 'center' }}>
                                <Icon type="minus-circle-o" />
                                <p>请先确定商圈</p>
                            </div>
                        }
                        {restaurants && selectedAddress &&
                            <div>
                                <AutoComplete
                                    placeholder="搜索店名"
                                    style={{ width: 300, margin: 10 }}
                                    dataSource={matchRestaurants.map((item, index) => {
                                        return <AutoComplete.Option
                                            key={index}
                                            value={`${item.id}`}>
                                            {item.name}
                                        </AutoComplete.Option>
                                    })}
                                    onSearch={this.handleSearchRestaurants}
                                    onSelect={this.selectMatchRestaurants}
                                />

                                <Table
                                    loading={isFetchingRastaurants}
                                    rowSelection={rowSelection}
                                    columns={restaurantColumns}
                                    dataSource={restaurants}
                                    scroll={{ y: 500 }}
                                    pagination={{ pageSize: 20 }}
                                    size="small" />

                                {selectedRestaurants && <Card title="选取的商家" style={{ marginTop: 10 }}>
                                    {selectedRestaurants.map(item => {
                                        return <Tag key={item.id} closable onClose={null}>{item.name}</Tag>
                                    })}
                                </Card>}
                            </div>
                        }
                    </Collapse.Panel>
                    <Collapse.Panel
                        header="1"
                        key="3"
                        style={configPanelStyle}>
                    </Collapse.Panel>
                </Collapse>
            </div >
        )
    }
}