import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, Route, browserHistory } from 'react-router';
import { persistStore } from 'redux-persist';

import configureStore from './store/configureStore';
import preloadedState from './store/preloadedState';

import App from './components/app';
import Login from './components/login';
import Main from './components/main';
import VideoChat from './components/video-chat';

import { setRoomId } from './actions';

const store = configureStore(preloadedState);
const history = syncHistoryWithStore(browserHistory, store);

const validateState = (store) => {
  return (nextState, replace) => {
    const state = store.getState();
    const token = state.user.token;
    const room = state.room.id;
    if (!token && !room) {
      store.dispatch(setRoomId(nextState.params.id));
      replace({
        pathname: '/login',
        state: { nextPathname: `/video/${nextState.params.id}` }
      });
    }
  };
};

const routes = (
  <Route path="/" component={App}>
    <Route path="/login" component={Login}/>
    <Route path="/main" component={Main}/>
    <Route path="/video/:id" component={VideoChat} onEnter={validateState(store)}/>
  </Route>
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes}/>
  </Provider>,
document.getElementById('root'));
