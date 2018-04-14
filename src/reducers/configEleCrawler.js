import { REQUEST_ELE_RESTAURANTS,REQUEST_ELE_CITY_LIST, RECEIVE_ELE_CITY_LIST,REQUEST_SEARCH_ELE_ADDRESS, RECEIVE_SEARCH_ELE_ADDRESS, RECEIVE_ELE_RESTAURANTS, REQUEST_CRAWLER_CONFIG, RECEIVE_CRAWLER_CONFIG,REQUEST_ELE_PIC_CODE, RECEIVE_ELE_PIC_CODE, REQUEST_LOGIN_ELE, RECEIVE_LOGIN_ELE, REQUEST_ELE_SMS_CODE, RECEIVE_ELE_SMS_CODE } from '../consts/actions'
import cookie from 'react-cookies'

const ele_has_login = cookie.load('ele_has_login')
const initState = {
  loginedEle: ele_has_login ? true : false,
  isLogining: false,
  isLoadingSmsCode: false,
  isLoadingGetPic: false,
  needEleLoginPic: false,
  ele_image_base64: null,
  ele_image_token: null,
  isSearchEleAddress: false,
  eleCities: {},
  address: null,
  isFetchingRastaurants: false,
  restaurants: [],
  hasMoreRestaurants: false
}
export default function configEleCrawler (state=initState, action) {
  switch (action.type) {
    case REQUEST_LOGIN_ELE:
    return Object.assign({}, state, {
      isLogining: true
    })
  case RECEIVE_LOGIN_ELE:
    let loginedEle = true
    if(!action.data.success){
      loginedEle = false
    }
    return Object.assign({}, state, {
      isLogining: false,
      ele_image_base64: null,
      ele_image_token: null,
      needEleLoginPic: false,
      loginedEle: loginedEle
    })
  case RECEIVE_ELE_SMS_CODE:
    let needEleLoginPic = false
    if(!action.data.success){      
      needEleLoginPic = action.data.message.name === 'NEED_CAPTCHA'
    }
    return Object.assign({}, state, {
      isLoadingSmsCode: false,
      ele_sms_token: action.data.ele_sms_token,
      needEleLoginPic: needEleLoginPic
    })
  case REQUEST_ELE_SMS_CODE:
    return Object.assign({}, state, {
      isLoadingSmsCode: true
    })
  case REQUEST_ELE_PIC_CODE:      
    return Object.assign({}, state, {
      isLoadingGetPic: true
    })
  case RECEIVE_ELE_PIC_CODE:
    if(!action.data.success){
      return Object.assign({}, state, {
        isLoadingGetPic: false,
        ele_image_base64: null,
        ele_image_token: null,
        needEleLoginPic: true
      })
    }
    return Object.assign({}, state, {
      isLoadingGetPic: false,
      ...action.data
    })
  case REQUEST_CRAWLER_CONFIG:
    return Object.assign({}, state, {
      isLogining: true
    })
  case RECEIVE_CRAWLER_CONFIG:
    return Object.assign({}, state, 
      {
        isLogining: false,
        ...action.data
      }
    )
  case REQUEST_ELE_CITY_LIST:
    return Object.assign({}, state, {
      isFetchingEleCity: true
    })
  case RECEIVE_ELE_CITY_LIST:
    return Object.assign({}, state, {
      eleCities: action.cities,
      isFetchingEleCity: false
    })
  case REQUEST_SEARCH_ELE_ADDRESS:
    return Object.assign({}, state, {
      isSearchEleAddress: true,
      address: null
    })
  case RECEIVE_SEARCH_ELE_ADDRESS:
    return Object.assign({}, state, {
      address: action.data,
      isSearchEleAddress: false
    })
    case REQUEST_ELE_RESTAURANTS:
      return Object.assign({}, state, {
          isFetchingRastaurants: true,
          restaurants: []
      })

    case RECEIVE_ELE_RESTAURANTS:      
      return Object.assign({}, state, {
          restaurants: action.data,
          isFetchingRastaurants: false,
          hasMoreRestaurants: action.data.length > 1
      })

    default:
      return state
  }
}
