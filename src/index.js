import React from 'react'
import './index.css'
import App from './component/App'
import Dashboard from './component/Dashboard'
import UserInfo from './component/UserInfo'
import UserHistory from './component/UserHistory'
import About from './component/About'
import Task from './component/Task'
import CrawlerEle from './component/crawler/CrawlerEle'
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom"
import registerServiceWorker from './registerServiceWorker'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import appStore from './reducers'
import {logger, crashReporter} from './utils/middleware'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

let store = createStore(appStore, composeWithDevTools(applyMiddleware(thunkMiddleware, logger, crashReporter)))

render((<Provider store={store}>
  <BrowserRouter>
    <App>
      <Switch>
        <Route exact path="/"><Redirect to="/dashborad" /></Route>
        <Route path="/dashborad" component={Dashboard} />        
        <Route path="/crawler/ele" component={CrawlerEle} />
        <Route path="/crawler/meituan" component={CrawlerEle} />
        <Route path="/task" component={Task}/>
        <Route path="/about" component={About}/>
        <Route path="/user/history" component={UserHistory}/>
        <Route path="/user/info" component={UserInfo}/>
        <Route exact path="*"><Redirect to="/dashborad" /></Route>
      </Switch>
    </App>
  </BrowserRouter>
</Provider>), document.getElementById('root'))

registerServiceWorker();
