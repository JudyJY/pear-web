import { combineReducers } from 'redux'
import { LOG_IN, REQUEST_LOGIN, RECEIVE_LOGIN } from './actions'
import {message} from 'antd'


function auth(state = {login: false, isFetching:false}, action) {
    switch (action.type) {
        case LOG_IN: 
        return Object.assign({}, state, {
            login: true
        })
        case REQUEST_LOGIN:
            return Object.assign({}, state, {
                isFetching: true,
                error: null,
                login: false                              
            })
        case RECEIVE_LOGIN:
            if(action.success){
                message.success('登录成功!')
            }else{
                message.error('登录失败!'+action.data.message)
            }
            return Object.assign({}, state, {
                isFetching: false,
                login: action.success,
                error: action.success ? null: action.data.message
            })
        default:
            return state;
    }
}

const appReducer = combineReducers({
    auth
})

export default appReducer