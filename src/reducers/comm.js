import { REQUEST_ERROR } from '../consts/actions'

export default function comm (state = {
    requestErrorMsg: null
  } , action) {
  switch (action.type) {
    case REQUEST_ERROR:
      return Object.assign({}, state, {requestErrorMsg: String(action.err)})
    default:
      return state
  }
}
