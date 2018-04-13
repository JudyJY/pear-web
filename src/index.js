import React from 'react'
import './index.css'
import App from './component/App'
import SignUp from './component/SignUp'
import Dashboard from './component/Dashboard'
import UserInfo from './component/UserInfo'
import UserHistory from './component/UserHistory'
import About from './component/About'
import Task from './component/Task'
import CrawlerEle from './component/crawler/CrawlerEle'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import registerServiceWorker from './registerServiceWorker'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import appStore from './reducers/index'
import { logger, crashReporter } from './utils/middleware'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import Login from './component/Login'
import SignUp from './component/SignUp'
import cookies from 'react-cookies'

let store = createStore(appStore, composeWithDevTools(applyMiddleware(thunkMiddleware, logger, crashReporter)))

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    cookies.load('u_id') ?
      <Component {...props} /> :
      <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
    )}
)

render((<Provider store={store}>
  <BrowserRouter>
    <App>
      <Switch>
        <PrivateRoute exact path="/"><Redirect to="/dashborad" /></PrivateRoute>
        <PrivateRoute path="/dashborad" component={Dashboard} />
        <PrivateRoute path="/crawler/ele" component={CrawlerEle} />
        <PrivateRoute path="/crawler/meituan" component={CrawlerEle} />
        <PrivateRoute path="/task" component={Task} />
        <PrivateRoute path="/about" component={About} />
        <PrivateRoute path="/user/history" component={UserHistory} />
        <PrivateRoute path="/user/info" component={UserInfo} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <PrivateRoute path="*"><Redirect to="/dashborad" /></PrivateRoute>
      </Switch>
    </App>    
  </BrowserRouter>
</Provider>), document.getElementById('root'))

registerServiceWorker();
