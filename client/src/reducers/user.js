import { handleActions } from 'redux-actions';
import * as constants from '../actions/constants';

export default handleActions({
  [constants.SET_USER_TOKEN]: function setUserToken(state, action) {
    return Object.assign({}, state, {
      token: action.token,
    });
  },
  [constants.SET_USER_ID]: function setUserId(state, action) {
    return Object.assign({}, state, {
      id: action.id,
    });
  },
  [constants.SET_USER_NAME]: function setUserName(state, action) {
    return Object.assign({}, state, {
      username: action.username
    });

  },
}, {});
