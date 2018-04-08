import { REQUEST_DASHBOARD, RECEIVE_DASHBOARD } from '../consts/actions'

export default function dashborad (state = {
    crawlers: [],
    crawler_tasks: [],
    analyse_tasks: [],
    isFetching: false
  } , action) {
  switch (action.type) {
    case REQUEST_DASHBOARD:
      return Object.assign({}, state, {isFetching: true})
    case RECEIVE_DASHBOARD:
      return Object.assign({}, state, {...action.data, isFetching: false})
    default:
      return state
  }
}
