import {RECEIVE_LOGIN, REQUEST_LOGIN, REQUEST_USER_INFO, RECEIVE_USER_INFO, LOGOUT} from '../consts/actions'
import cookie from 'react-cookies'

const u_id = cookie.load('u_id')
export default function user(state = {
  logined: u_id
    ? true
    : false,
  isFetching: false,
  uId: u_id
}, action) {
  switch (action.type) {
    case REQUEST_LOGIN:      
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
        logined: false
      })
    case RECEIVE_LOGIN:      
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