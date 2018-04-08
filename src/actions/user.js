import { REQUEST_LOGIN, RECEIVE_LOGIN, REQUEST_USER_INFO, RECEIVE_USER_INFO, LOGOUT } from '../consts/actions'
import fetch from '../utils/fetch'
import cookie from 'react-cookies'
import { requestError } from './comm'

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
            return dispatch(receiveLogin(user, json))
          })
        } else {
          resp.json().then(json => {
            return dispatch(receiveLogin(user, json, false))
          })
        }
      })
      .catch(err => {
        return dispatch(requestError(err))
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
        return dispatch(requestError(err))
      })
  }
}

export function logout () {
  cookie.remove('u_id', { path: '/'})
  return {type: LOGOUT}
}
