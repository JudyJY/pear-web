import { RECEIVE_LOGIN, REQUEST_LOGIN, REQUEST_USER_INFO, RECEIVE_USER_INFO, LOGOUT, REQUEST_SIGNUP, RECEIVE_SIGNUP } from '../consts/actions'
import cookie from 'react-cookies'

const uId = cookie.load('u_id')
export default function user(state = {
    isFetching: false,
    uId: uId
}, action) {
    switch (action.type) {
        case REQUEST_LOGIN:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RECEIVE_LOGIN:
            return Object.assign({}, state, {
                isFetching: false,
                uId: action.success && action.data.user.id
            })
        case REQUEST_USER_INFO:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RECEIVE_USER_INFO:
            return Object.assign({}, state, {
                isFetching: false,
                ...action.data
            })
        case LOGOUT:
            return Object.assign({}, state, {
                uId: null,
                email: null,
                id: null,
                mobile: null,
                name: null
            })
        case REQUEST_SIGNUP:
            return Object.assign({}, state, {
                isFetching: true,
                signupSuccess: false
            })
        case RECEIVE_SIGNUP:
            return Object.assign({}, state, {
                isFetching: false,
                signupSuccess: action.success
            });
        default:
            return state
    }
}