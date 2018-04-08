import {REQUEST_ERROR} from '../consts/actions'

export default function comm (state = {} , action) {
  switch (action.type) {
    case REQUEST_ERROR:      
      return Object.assign({}, state, ...action.data)
    default:
      return state
  }
}