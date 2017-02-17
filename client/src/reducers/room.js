import { handleActions } from 'redux-actions';
import * as constants from '../actions/constants';

export default handleActions({
  [constants.SET_ROOM_ID]: function setRoomId(state, action) {
    return Object.assign({}, state, {
      id: action.id,
    });
  },
  [constants.CLEAR_ROOM]: function clearRoom(state, action) {
    return Object.assign({}, state, {
      id: null,
    });
  },
}, {});
