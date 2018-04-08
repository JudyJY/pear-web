import { REQUEST_ERROR } from '../consts/actions'

function requestError (err) {
  return {type: REQUEST_ERROR, err}
}

export {requestError}
