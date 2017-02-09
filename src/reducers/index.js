import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import user from './user';
import room from './room';
import peripherals from './peripherals';

const rootReducer = combineReducers({
  user,
  routing
});

export default rootReducer;
