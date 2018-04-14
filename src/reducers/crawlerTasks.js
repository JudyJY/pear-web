import {REQUEST_CRAWLER_TASKS, RECEIVE_CRAWLER_TASKS} from '../consts/actions'

export default function crawlerTasks(state={
  isFetching: false,
}, action){
  switch (action.type) {
    case REQUEST_CRAWLER_TASKS:
      return Object.assign({}, state, {
        isFetching: true
      })

    case RECEIVE_CRAWLER_TASKS:
      return Object.assign({}, state, {
        isFetching: false,
        ...action.data
      })

    default:
      return state
  }
}
