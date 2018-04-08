import React, { Component } from 'react'
import { Steps, Card } from 'antd'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'
import {
  getEleSmsCode, error, loginEle, elePicCode, fetchCrawlerConfig, fetchEleCityList,
  searchEleAddress, fetchEleRestaurants
} from '../../actions/index'
import CrawlerConfig from './CrawlerConfig'

const Step = Steps.Step

class CrawlerEle extends Component {

  constructor(props) {
    super(props)
    const { loginedEle } = props
    this.state = {
      currentStep: loginedEle ? 1 : 0
    }
    if (loginedEle) {
      this.props.fetchCrawlerConfig({ platform: 'ele' })
    }
  }

  componentWillReceiveProps(nextProps) {
    const { loginedEle, configedEleCrawler } = nextProps
    const { currentStep } = this.state
    if (loginedEle && currentStep !== 1) {
      this.setState({ currentStep: 1 })
      this.props.fetchCrawlerConfig({
        platform: 'ele'
      })
    }

    if (configedEleCrawler && currentStep !== 2) {
      this.setState({ currentStep: 2 })
    }
  }

  handleLogin = (data) => {
    if (!data.ele_sms_code) {
      this.props.errorNotifi("请输入验证码")
      return
    }
    if (this.props.needLoginPic) {
      this.props.getEleSmsCode(data)
    }
    if (!this.props.ele_sms_token) {
      this.props.errorNotifi("请先获取短信验证码")
      return
    }
    const payload = {
      mobile: data.mobile,
      ele_sms_code: data.ele_sms_code,
      ele_sms_token: this.props.ele_sms_token
    }
    this.props.loginEle(payload)
  }

  handleGetCaptcha = (data) => {
    const payload = {
      mobile: data.mobile
    }
    const { needEleLoginPic, ele_image_token } = this.props
    if (needEleLoginPic) {
      if (!data.pic_code) {
        this.props.errorNotifi("请输入图片验证码")
        return
      }
      payload['ele_pic_code'] = data.pic_code
      payload['ele_image_token'] = ele_image_token
    }
    this.props.getEleSmsCode(payload)
  }

  handleGetPicCaptcha = (data) => {
    const payload = {
      mobile: data.mobile
    }
    this.props.elePicCode(payload)
  }

  render() {
    const { currentStep } = this.state
    const { needEleLoginPic, ele_image_base64, isLoadingSmsCode, isLoadingGetPic, isLogining } = this.props
    return (
      <div>
        <Card>
          <Steps current={currentStep} status="process">
            <Step title="登录饿了么" description="使用饿了么账户登录" />
            <Step title="配置爬虫" description="配置爬虫详情" />
            <Step title="开始任务" />
          </Steps>
        </Card>
        {
          currentStep === 0 &&
          <Card>
            <LoginForm
              onCommit={this.handleLogin}
              onCaptcha={this.handleGetCaptcha}
              isLogining={isLogining}
              isLoadingSmsCode={isLoadingSmsCode}
              isLoadingGetPic={isLoadingGetPic}
              needLoginPic={needEleLoginPic}
              image_base64={ele_image_base64}
              onPicCaptcha={this.handleGetPicCaptcha}
            />
          </Card>
        }
        {
          currentStep === 1 && <CrawlerConfig {...this.props} />
        }
        {
          currentStep === 2 &&
          <div>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return Object.assign({}, state.configEleCrawler)
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEleSmsCode: (data) => {
      return dispatch(getEleSmsCode(data))
    },
    loginEle: (data) => {
      return dispatch(loginEle(data))
    },
    errorNotifi: (err) => {
      return dispatch(error(err))
    },
    elePicCode: (data) => {
      return dispatch(elePicCode(data))
    },
    fetchCrawlerConfig: (data) => {
      return dispatch(fetchCrawlerConfig(data))
    },
    fetchEleCityList: () => {
      return dispatch(fetchEleCityList())
    },
    searchEleAddress: (keyword) => {
      return dispatch(searchEleAddress(keyword))
    },
    fetchEleRestaurants: (data) => {
      return dispatch(fetchEleRestaurants(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CrawlerEle)
