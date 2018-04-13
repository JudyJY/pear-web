import fetch from '../utils/fetch'
import {REQUEST_CRAWLER_TASKS, RECEIVE_CRAWLER_TASKS} from '../consts/actions'

const requestCrawlerTasks = (data) => {
  return {type: REQUEST_CRAWLER_TASKS, data}
}

const receiveCrawlerTasks = (data) => {
  return {type: RECEIVE_CRAWLER_TASKS, data}
}

export function fetchCrawlerTasks(data) {
  return dispatch => {
    dispatch(requestCrawlerTasks(data))
    return fetch('crawler_tasks', 'GET', data).then(resp => {
      if(resp.status===200){
        return resp.json()
      }
    })
  }
}
