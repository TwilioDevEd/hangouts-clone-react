import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import user from './user';
import room from './room';

const rootReducer = combineReducers({
  user,
  room,
  routing
});

export default rootReducer;
