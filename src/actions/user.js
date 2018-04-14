import { REQUEST_LOGIN, RECEIVE_LOGIN, REQUEST_USER_INFO, RECEIVE_USER_INFO, LOGOUT, REQUEST_SIGNUP, RECEIVE_SIGNUP} from '../consts/actions'
import fetch from '../utils/fetch'
import cookie from 'react-cookies'
import { requestError } from './comm'
import {message} from 'antd'

function requetLogin (user) {
  return {type: REQUEST_LOGIN, user}
}

function receiveLogin (user, data, success = true) {
  return {type: RECEIVE_LOGIN, user, data: data, success: success}
}

export function fetchLogin (user) {
  return dispatch => {
    dispatch(requetLogin(user))
    return fetch(`auth/login`, 'POST', user)
      .then(resp => {
        if (resp.status === 200) {
          resp.json().then(json => {
            cookie.save('u_id', json.user.id)
            message.success('登录成功')
            return dispatch(receiveLogin(user, json))
          })
        } else {
          resp.json().then(json => {
            message.error(json.message)
            return dispatch(receiveLogin(user, json, false))
          })
        }
      })
      .catch(err => {
        return dispatch(receiveLogin(user, {message: '网络错误'}, false))
      })
  }
}

function requetUserInfo () {
  return {type: REQUEST_USER_INFO}
}

function receiveUserInfo (userInfo, success = true) {
  return {type: RECEIVE_USER_INFO, data: userInfo, success: success}
}

export function fetchUserInfo () {
  return dispatch => {
    dispatch(requetUserInfo())
    return fetch(`user`, 'GET').then(resp => {
      if (resp.status === 200) {
        resp.json().then(json => {
          return dispatch(receiveUserInfo(json))
        })
      } else {
        resp.json().then(json => {
          return dispatch(receiveUserInfo(json, false))
        })
      }
    })
      .catch(err => {
        return dispatch(receiveUserInfo({message: '网络错误'}, false))
      })
  }
}

function requetSignup (user) {
  return {type: REQUEST_SIGNUP, user}
}

function receiveSignup (user, data, success = true) {
  return {type: RECEIVE_SIGNUP, user, data: data, success: success}
}

export function fetchSignup (user) {
  return dispatch => {
    dispatch(requetSignup(user))
    return fetch('auth/signup', 'POST', user)
      .then(resp => {
        if (resp.status === 200) {
          resp.json().then(json => {
            message.success('注册成功，请登录')
            return dispatch(receiveSignup(user, json))
          })
        } else {
          resp.json().then(json => {
            message.error(json.message)
            return dispatch(receiveSignup(user, json, false))
          })
        }
      })
      .catch(err => {
        return dispatch(receiveSignup(user, {message: '网络错误'}, false))
      })
  }
}

export function logout () {
  cookie.remove('u_id', { path: '/'})
  return {type: LOGOUT}
}
