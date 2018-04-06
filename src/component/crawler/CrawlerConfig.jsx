import React, { Component } from 'react'
import { Row, Col, Select, Card, Input, Popover, Button, Tabs, Modal, List, Cascader, Spin, Icon } from 'antd'


const TabPane = Tabs.TabPane
const { Option, OptGroup } = Select

export default class CrawlerConfig extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectCity: null
        }
    }

    componentWillMount() {
        this.props.fetchEleCityList()
    }

    toggleCityListModal = () => {
        this.setState({ showCityList: !this.state.showCityList })
    }

    selectedCity = (item) => {
        this.toggleCityListModal()
        this.setState({ selectCity: item })
        console.log(item)
    }

    render() {
        const { eleCities, isFetchingEleCity } = this.props
        const { selectCity } = this.state
        const options = eleCities && Object.keys(eleCities).map((key, index) => {
            return {
                value: key,
                label: key,
                children: eleCities[key].map((item, index) => {
                    return {
                        value: item,
                        label: item.name
                    }
                })
            }
        })
        const filter = (inputValue, path) => {
            return (path.some(option => (option.label).indexOf(inputValue) > -1))
        }
        const displayRender = (label) => {
            return label[label.length - 1]
        }
        const cityList = (
            <Cascader options={options} placeholder="选择一个城市" disabled={isFetchingEleCity} showSearch={{ filter }} expandTrigger="hover"
                displayRender={displayRender} />
        )

        return (
            <div>
                <Card title="确定爬取商家" style={{ marginTop: 10 }}>
                    <Row>
                        <Col span={6}>
                            {
                                isFetchingEleCity ? <Spin spinning={isFetchingEleCity} indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} /> : cityList
                            }
                        </Col>
                        <Col span={16}>
                            <Input placeholder="输入你的目标店名" />
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}