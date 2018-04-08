import { fetchLogin, logout, fetchUserInfo } from './user'
import { fetchDashboard } from './dashboard'
import { getEleSmsCode, error, loginEle, elePicCode, 
    fetchCrawlerConfig, fetchEleCityList, searchEleAddress, fetchEleRestaurants } from './configEleCrawler'

export { fetchLogin, logout, fetchUserInfo, fetchDashboard, fetchEleRestaurants,
     getEleSmsCode, error, loginEle, elePicCode, fetchCrawlerConfig, 
     fetchEleCityList, searchEleAddress }
