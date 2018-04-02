import {combineReducers} from 'redux'
import {REQUEST_LOGIN, RECEIVE_LOGIN, RECEIVE_USER_INFO, REQUEST_USER_INFO, REQUEST_ERROR} from './actions'
import {REQUEST_DASHBOARD, RECEIVE_DASHBOARD} from './actions'
import {message} from 'antd'
import cookie from 'react-cookies'

const u_id = cookie.load('u_id')
let hideProgress = null
function auth(state = {
  login: u_id
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
        login: false
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
        login: action.success,
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
          login: action.success,
          error: action.success ? null : action.data.message
        })
     case REQUEST_ERROR:
          if(hideProgress) {
            hideProgress()
          }
          message.error('请求失败')
          return Object.assign({}, state, {
            isFetching: false,
            error: action.data
          })
    default:
      return state;
  }
}

function dashborad(state={
  crawlers: [],
  tasks: [],
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
    case REQUEST_ERROR:
      message.error(action.data)
      return Object.assign({}, state, {
        isFetching: false
      })
    default:
      return state
  }
}

const appReducer = combineReducers({auth, dashborad})

export default appReducer
