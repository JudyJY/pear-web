import fetch from 'cross-fetch'

const baseUrl = 'http://192.168.1.6:9999/' 

//封装网络请求
export default (endPoint, method, data = null) => {
  // data should -> {}
  if (endPoint.search('http://') === 0 || endPoint.search('https://') === 0) {  
    return fetch(endPoint, method)
  }
  let config = {
    'method': method,
    'headers': {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000'
    },
    'credentials': 'include'
  }
  let url = baseUrl + endPoint
  if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
    if (data !== null) {
      config['body'] = JSON.stringify(data)
    }
  }
  if (method === 'GET' && data !== null) {
    url += '?'
    for (const key of Object.keys(data)) {
      const value = data[key]
      url += key
      url += '='
      url += value
      url += '&'
    }
  }
  return fetch(url, config)
}
