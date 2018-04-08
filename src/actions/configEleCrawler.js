import fetch from '../utils/fetch'
import { REQUEST_ELE_RESTAURANTS, RECEIVE_ELE_RESTAURANTS, REQUEST_CRAWLER_CONFIG, RECEIVE_CRAWLER_CONFIG, REQUEST_DASHBOARD, RECEIVE_DASHBOARD, REQUEST_ELE_CITY_LIST, RECEIVE_ELE_CITY_LIST, REQUEST_ELE_PIC_CODE, RECEIVE_ELE_PIC_CODE, REQUEST_ELE_SMS_CODE, RECEIVE_ELE_SMS_CODE, REQUEST_LOGIN_ELE, RECEIVE_LOGIN_ELE, REQUEST_SEARCH_ELE_ADDRESS, RECEIVE_SEARCH_ELE_ADDRESS } from '../consts/actions'
import {requestError} from './comm'

const requestEleRstraurants = () => {
  return {type: REQUEST_ELE_RESTAURANTS}
}
const receiveEleRestaurants = (data) => {
  return {type: RECEIVE_ELE_RESTAURANTS, data}
}

export function fetchEleRestaurants (data) {
  return dispatch => {
    dispatch(requestEleRstraurants())
    return fetch(`crawlers/get_ele_restaurants`, 'POST', data)
      .then(resp => {
        if (resp.status === 200) {
          return resp.json().then(json => {
            return dispatch(receiveEleRestaurants(json))
          })
        } else {
          return dispatch(receiveEleRestaurants([]))
        }
      })
      .catch(err => {
        return dispatch(requestError(err))
      })
  }
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
        return dispatch(requestError(err))
      })
  }
}

const requestSearchEleAddress = (data) => {
  // data: {key: 'keyword'}
  return {type: REQUEST_SEARCH_ELE_ADDRESS, data}
}

const receiveSearchEleAddress = (data) => {
  return {type: RECEIVE_SEARCH_ELE_ADDRESS, data}
}

export function searchEleAddress (keyword) {
  const payload = {key: keyword}
  return dispatch => {
    dispatch(requestSearchEleAddress(payload))
    fetch(`crawlers/search_ele_address`, 'GET', payload)
      .then(resp => {
        if (resp.status === 200) {
          return resp.json().then(json => {
            return dispatch(receiveSearchEleAddress(json))
          })
        } else {
          return dispatch(receiveSearchEleAddress([]))
        }
      })
      .catch(err => {
        return dispatch(requestError(err))
      })
  }
}
