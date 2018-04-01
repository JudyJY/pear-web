import fetch from 'cross-fetch'

export const LOG_IN = 'LOG_IN'
export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN'

export function login(user){
    return {
        type: LOG_IN,
        user
    }
}

function requetLogin(user) {
    return {
        type: REQUEST_LOGIN,
        user
    }
}

function receiveLogin(user, data, success=true) {
    return {
        type: RECEIVE_LOGIN,
        user,
        data: data,
        success: success,        
        receivedAt: Date.now()
    }
}

export function fetchLogin(user) {
    return dispatch => {
        dispatch(requetLogin(user))
        return fetch(`http://localhost:9999/auth/login`, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:3000"
            }
        })
        .then(resp => {
            console.log(resp)
            if(resp.status===200){
                resp.json().then(json => {
                    return dispatch(receiveLogin(user, json))
                })
            }else{                
                resp.json().then(json => {
                    return dispatch(receiveLogin(user, json, false))
                })
            }
        })        
    }
}