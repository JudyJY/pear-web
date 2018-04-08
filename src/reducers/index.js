import { combineReducers } from 'redux'
import configEleCrawler from './configEleCrawler'
import comm from './comm'
import user from './user'
import dashborad from './dashborad'

const appReducer = combineReducers({
configEleCrawler, comm, user, dashborad})
export default appReducer
