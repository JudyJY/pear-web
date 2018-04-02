import fetch from './utils/fetch'

export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN'

export const REQUEST_USER_INFO = 'REQUEST_USER_INFO'
export const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO'

export const REQUEST_DASHBOARD = 'REQUEST_DASHBOARD'
export const RECEIVE_DASHBOARD = 'RECEIVE_DASHBOARD'

export const REQUEST_ERROR = 'REQUEST_ERROR'

function requestError(err){
  return {type: REQUEST_ERROR, err}
}

function requetLogin(user) {
  return {type: REQUEST_LOGIN, user}
}

function receiveLogin(user, data, success = true) {
  return {type: RECEIVE_LOGIN, user, data: data, success: success}
}

export function fetchLogin(user) {
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

function requetUserInfo() {
  return {type: REQUEST_USER_INFO}
}

function receiveUserInfo(userInfo, success=true) {
  return {type: RECEIVE_USER_INFO, data: userInfo, success: success}
}

export function fetchUserInfo() {
  return dispatch => {
    dispatch(requetUserInfo())
    return fetch(`user`, 'GET').then(resp => {
      if(resp.status === 200) {
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

function requestDashboard(){
  return {type: REQUEST_DASHBOARD}
}

function receiveDashboard(data, success=true){
  return {type: RECEIVE_DASHBOARD, data, success}
}

export function fetchDashboard() {
  return dispatch => {
    dispatch(requestDashboard())
    return fetch(``, 'GET').then(resp => {
      if(resp.status === 200) {
        resp.json().then(json => {
          return dispatch(receiveDashboard(json))
        })
      } else {
        return dispatch(receiveDashboard('', false))
      }
    })
    .catch(err => {
      return dispatch(requestError(err))
    })
  }
}
