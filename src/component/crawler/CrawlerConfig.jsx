import React, { Component } from 'react'
import { Row, Col, Select, Card, Input, Popover, Button, Tabs, Modal, List, Cascader, Spin, Icon, AutoComplete, Tree, message } from 'antd'

const TabPane = Tabs.TabPane
const { Option, OptGroup } = Select

export default class CrawlerConfig extends Component {

    constructor(props) {
        super(props)
        this.state = {
            addressModalVisible: false,
            selectedAddress: null
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
        this.setState({
            addressModalVisible: false,
            selectedAddress: value
        })
    }

    render() {
        const { isSearchEleAddress, address } = this.props
        const { selectedAddress } = this.state
        return (
            <div>
                <Card title="确定商圈" style={{ marginTop: 10 }}>
                    <Row>
                        <Col span={12}>
                            商家所属商圈: {selectedAddress ?
                                <Tree
                                    defaultExpandAll>
                                    {Object.keys(selectedAddress).map((key, index) => {
                                        const value = selectedAddress[key]
                                        return <Tree.TreeNode title={key} key={key}>
                                            <Tree.TreeNode title={value} key={value} />
                                        </Tree.TreeNode>
                                    })}
                                </Tree> : <div>请在右侧搜索确定 <Icon type="arrow-right" /></div>}
                        </Col>
                        <Col span={12}>
                            <div style={{ width: 400 }}>
                                <Input.Search
                                    placeholder={"输入搜索地点"}
                                    onSearch={this.handleSearch}
                                    enterButton
                                />

                                <Modal
                                    title="选择地点"
                                    visible={this.state.addressModalVisible}
                                    footer={null}
                                    closable
                                    destroyOnClose
                                >
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
                        </Col>
                    </Row>
                </Card>
                <Card title="确定商家" style={{ marginTop: 10 }}>
                </Card>
            </div>
        )
    }
}