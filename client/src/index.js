import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, Route, browserHistory } from 'react-router';

import configureStore from './store/configureStore';
import preloadedState from './store/preloadedState';

import App from './components/app';
import Login from './components/login';
import Main from './components/main';
import VideoChat from './components/video-chat';

const store = configureStore(preloadedState);
const history = syncHistoryWithStore(browserHistory, store);

const routes = (
  <Route path="/" component={App}>
    <Route path="/login" component={Login}/>
    <Route path="/main" component={Main}/>
    <Route path="/video/:id" component={VideoChat}/>
  </Route>
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes}/>
  </Provider>,
document.getElementById('root'));
