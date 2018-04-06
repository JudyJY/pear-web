import fetch from './utils/fetch'
import cookie from 'react-cookies'
export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN'

export const REQUEST_USER_INFO = 'REQUEST_USER_INFO'
export const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO'

export const REQUEST_DASHBOARD = 'REQUEST_DASHBOARD'
export const RECEIVE_DASHBOARD = 'RECEIVE_DASHBOARD'
export const REQUEST_ERROR = 'REQUEST_ERROR'
export const LOGOUT = 'LOGOUT'

export const REQUEST_LOGIN_ELE = 'REQUEST_LOGIN_ELE'
export const RECEIVE_LOGIN_ELE = 'RECEIVE_LOGIN_ELE'
export const REQUEST_ELE_SMS_CODE = 'REQUEST_ELE_SMS_CODE'
export const RECEIVE_ELE_SMS_CODE = 'RECEIVE_ELE_SMS_CODE'
export const REQUEST_ELE_PIC_CODE = 'REQUEST_ELE_PIC_CODE'
export const RECEIVE_ELE_PIC_CODE = 'RECEIVE_ELE_PIC_CODE'

export const REQUEST_CRAWLER_CONFIG = 'REQUEST_CRAWLER_CONFIG'
export const RECEIVE_CRAWLER_CONFIG = 'RECEIVE_CRAWLER_CONFIG'

export const REQUEST_ELE_CITY_LIST = 'REQUEST_ELE_CITY_LIST'
export const RECEIVE_ELE_CITY_LIST = 'RECEIVE_ELE_CITY_LIST'

export function error (err) {
  return {type: REQUEST_ERROR, err}
}

function requestError (err) {
  return {type: REQUEST_ERROR, err}
}

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

function requestDashboard () {
  return {type: REQUEST_DASHBOARD}
}

function receiveDashboard (data, success = true) {
  return {type: RECEIVE_DASHBOARD, data, success}
}

export function fetchDashboard () {
  return dispatch => {
    dispatch(requestDashboard())
    return fetch(`dashboard`, 'GET').then(resp => {
      if (resp.status === 200) {
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

export function logout () {
  cookie.remove('u_id', { path: '/'})
  return {type: LOGOUT}
}

function requestLoginEle (data) {
  return {type: REQUEST_LOGIN_ELE, data}
}

function receiveLoginELe (data) {
  return {type: RECEIVE_LOGIN_ELE, data}
}

function requestEleSmsCode (data) {
  return {type: REQUEST_ELE_SMS_CODE, data}
}

function receiveEleSmsCode (data) {
  return {type: RECEIVE_ELE_SMS_CODE, data}
}

export function getEleSmsCode (data) {
  return dispatch => {
    dispatch(requestEleSmsCode(data))
    return fetch(`crawlers/ele_sms_code`, 'GET', data)
      .then(resp => {
        if (resp.status === 200) {
          return resp.json().then(json => {
            return dispatch(receiveEleSmsCode(json))
          })
        }else {
          return dispatch(receiveEleSmsCode({success: false, message: '请求错误'}))
        }
      })
      .catch(err => {
        return dispatch(requestError(err))
      })
  }
}

export function loginEle (data) {
  return dispatch => {
    dispatch(requestLoginEle(data))
    return fetch(`crawlers/login_ele`, 'GET', data)
      .then(resp => {
        if (resp.status === 200) {
          return resp.json().then(json => {
            return dispatch(receiveLoginELe(json))
          })
        }else {
          return dispatch(receiveLoginELe({success: false, message: '请求错误'}))
        }
      })
      .catch(err => {
        return dispatch(receiveLoginELe({success: false, message: '请求错误'}))
      })
  }
}

function requestElePicCode (data) {
  return {type: REQUEST_ELE_PIC_CODE, data}
}

function receiveElePicCode (data) {
  return {type: RECEIVE_ELE_PIC_CODE, data}
}

export function elePicCode (data) {
  return dispatch => {
    dispatch(requestElePicCode(data))
    return fetch(`crawlers/ele_pic_code`, 'GET', data)
      .then(resp => {
        if (resp.status === 200) {
          return resp.json().then(json => {
            return dispatch(receiveElePicCode(json))
          })
        }else {
          return dispatch(receiveElePicCode({success: false, message: '请求错误'}))
        }
      })
      .catch(err => {
        return dispatch(receiveElePicCode({success: false, message: '请求错误'}))
      })
  }
}

function requestCrawlerConfig (data) {
  return {type: REQUEST_CRAWLER_CONFIG, data}
}

function receiveCrawlerConfig (data) {
  return {type: RECEIVE_CRAWLER_CONFIG, data}
}

export function fetchCrawlerConfig (data) {
  return dispatch => {
    dispatch(requestCrawlerConfig(data))
    return fetch(`crawlers/configs`, 'GET', data)
      .then(resp => {
        if (resp.status === 200) {
          return resp.json().then(json => {
            return dispatch(receiveCrawlerConfig(json))
          })
        }else {
          return dispatch(receiveCrawlerConfig({success: false, message: '请求失败'}))
        }
      })
  }
}

const requestEleCityList = () => {
  return {type: REQUEST_ELE_CITY_LIST}
}

const receiveEleCityList = (cities) => {
  return {type: RECEIVE_ELE_CITY_LIST, cities}
}

export function fetchEleCityList () {
  return dispatch => {
    dispatch(requestEleCityList())
    return fetch(`crawlers/ele_cities`)
      .then(resp => {
        if (resp.status === 200) {
          return resp.json().then(json => {
            return dispatch(receiveEleCityList(json))
          })
        }else {
          return dispatch(receiveEleCityList([]))
        }
      })
      .catch(err => {
        return dispatch(error(err))
      })
  }
}
