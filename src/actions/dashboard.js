import { REQUEST_DASHBOARD, RECEIVE_DASHBOARD } from '../consts/actions'
import { requestError } from './comm'
import fetch from '../utils/fetch'

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
