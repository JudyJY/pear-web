import React from 'react'
import './index.css'
import App from './component/App'
import Dashboard from './component/Dashboard'
import UserInfo from './component/UserInfo'
import About from './component/About'
import Task from './component/Task'
import {BrowserRouter, Route, Switch} from "react-router-dom"
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
        <Route exact path="/" component={Dashboard}/>
        <Route path="/task" component={Task}/>
        <Route path="/about" component={About}/>
        <Route path="/user/info" component={UserInfo}/>
      </Switch>
    </App>
  </BrowserRouter>
</Provider>), document.getElementById('root'))

registerServiceWorker();
