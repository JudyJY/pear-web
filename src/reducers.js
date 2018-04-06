import {combineReducers} from 'redux'
import {REQUEST_LOGIN, RECEIVE_LOGIN, RECEIVE_USER_INFO, REQUEST_USER_INFO, REQUEST_ERROR} from './actions'
import {REQUEST_DASHBOARD, RECEIVE_DASHBOARD, LOGOUT} from './actions'
import {RECEIVE_LOGIN_ELE, REQUEST_LOGIN_ELE, REQUEST_ELE_SMS_CODE, RECEIVE_ELE_SMS_CODE, REQUEST_ELE_PIC_CODE, RECEIVE_ELE_PIC_CODE, RECEIVE_CRAWLER_CONFIG, REQUEST_CRAWLER_CONFIG} from './actions'
import {REQUEST_ELE_CITY_LIST,RECEIVE_ELE_CITY_LIST} from './actions'
import {message} from 'antd'
import cookie from 'react-cookies'

let hideProgress = null
function comm(state={}, action) {
  switch (action.type) {
    case REQUEST_ERROR:
         if(hideProgress) {
           hideProgress()
         }
         if(action.err){           
           message.error(action.err+"")
         } else {
          message.error('请求失败')
         }
         return Object.assign({}, state, {
           isFetching: false,
           error: action.data
         })
     default:
      return state
  }
}

const u_id = cookie.load('u_id')
function auth(state = {
  logined: u_id
    ? true
    : false,
  isFetching: false,
  uId: u_id
}, action) {
  switch (action.type) {
    case REQUEST_LOGIN:
      hideProgress = message.loading('登录中...')
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
        logined: false
      })
    case RECEIVE_LOGIN:
      if(hideProgress) {
        hideProgress()
      }
      if (action.success) {
        message.success('登录成功!')
      } else {
        message.error('登录失败!' + action.data.message)
      }
      return Object.assign({}, state, {
        isFetching: false,
        logined: action.success,
        error: action.success
          ? null
          : action.data.message,
        ...action.data
      })
    case REQUEST_USER_INFO:
        return Object.assign({}, state, {
          isFetching: true,
          error: null
        })
    case RECEIVE_USER_INFO:
        if (!action.success){
          message.error('登录信息失效，请重新登录')
          cookie.remove('u_id', { path: '/'})
        }
        return Object.assign({}, state, {
          isFetching: false,
          ...action.data,
          logined: action.success,
          error: action.success ? null : action.data.message
        })
    case LOGOUT:
        return Object.assign({}, state, {
          logined: false
        })
    default:
      return state;
  }
}

function dashborad(state={
  crawlers: [],
  crawler_tasks: [],
  analyse_tasks: [],
  isFetching: false
}, action){
  switch (action.type) {
    case REQUEST_DASHBOARD:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_DASHBOARD:
      if(!action.success){
        message.error('请求失败')
      }
      return Object.assign({}, state, {
        isFetching: false,
        ...action.data
      })
    default:
      return state
  }
}

const ele_has_login = cookie.load('ele_has_login')
const meituan_has_login = cookie.load('ele_has_login')
function crawlerConfig(state={
  loginedEle: ele_has_login ? true : false,
  loginedMeituan: meituan_has_login ? true : false,
  isLogining: false,
  isLoadingSmsCode: false,
  isLoadingGetPic: false,
  needEleLoginPic: false,
  ele_image_base64: null,
  ele_image_token: null,
  isFetchingEleCity: false,
  eleCities: {}
}, action) {
  switch (action.type) {
    case REQUEST_LOGIN_ELE:
      return Object.assign({}, state, {
        isLogining: true
      })
    case RECEIVE_LOGIN_ELE:
      let loginedEle = true
      if(!action.data.success){
        message.error(action.data.message.message)
        loginedEle = false
      }
      message.success('饿了么登录验证成功')
      return Object.assign({}, state, {
        isLogining: false,
        ele_image_base64: null,
        ele_image_token: null,
        needEleLoginPic: false,
        loginedEle: loginedEle
      })
    case RECEIVE_ELE_SMS_CODE:
      let needEleLoginPic = false
      if(!action.data.success){
        message.error(action.data.message.message)
        needEleLoginPic = action.data.message.name === 'NEED_CAPTCHA'
      }else{
        message.success("短信验证码获取成功")
      }
      return Object.assign({}, state, {
        isLoadingSmsCode: false,
        ele_sms_token: action.data.ele_sms_token,
        needEleLoginPic: needEleLoginPic
      })
    case REQUEST_ELE_SMS_CODE:
      return Object.assign({}, state, {
        isLoadingSmsCode: true
      })
    case REQUEST_ELE_PIC_CODE:      
      return Object.assign({}, state, {
        isLoadingGetPic: true
      })
    case RECEIVE_ELE_PIC_CODE:
      if(!action.data.success){
        message.error(action.data.message)
        return Object.assign({}, state, {
          isLoadingGetPic: false,
          ele_image_base64: null,
          ele_image_token: null,
          needEleLoginPic: true
        })
      }
      return Object.assign({}, state, {
        isLoadingGetPic: false,
        ...action.data
      })
    case REQUEST_CRAWLER_CONFIG:
      return Object.assign({}, state, {
        isLogining: true
      })
    case RECEIVE_CRAWLER_CONFIG:
      return Object.assign({}, state, 
        {
          isLogining: false,
          ...action.data
        }
      )
    case REQUEST_ELE_CITY_LIST:
      return Object.assign({}, state, {
        isFetchingEleCity: true
      })
    case RECEIVE_ELE_CITY_LIST:
      return Object.assign({}, state, {
        eleCities: action.cities,
        isFetchingEleCity: false
      })
    default:
      return state
  }
}

const appReducer = combineReducers({
  auth,
  dashborad,
  comm,
  crawlerConfig
})

export default appReducer
