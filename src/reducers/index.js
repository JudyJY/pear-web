import { combineReducers } from 'redux'
import configEleCrawler from './configEleCrawler'
import comm from './comm'
import user from './user'
import dashborad from './dashborad'
import crawlerTasks from './crawlerTasks'

const appReducer = combineReducers({
    configEleCrawler, comm, user, dashborad, crawlerTasks
})
export default appReducer
