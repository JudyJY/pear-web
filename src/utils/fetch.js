import fetch from 'cross-fetch'

const baseUrl = 'http://localhost:9999/'

export default (endPoint, method, data=null) => {
  let config = {
    'method': method,
    'headers': {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000"
    },
    'credentials': 'include'
  }
  if (method === 'POST') {
    config['body'] = JSON.stringify(data)
  }
  return fetch(baseUrl + endPoint, config)
}
