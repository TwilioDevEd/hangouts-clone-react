import * as constants from './constants';

export const setUserToken = (token) => {
  return {
    type: constants.SET_USER_TOKEN,
    token,
  };
};

export const setUserId = (id) => {
  return {
    type: constants.SET_USER_ID,
    id,
  };
};

export const setUserName = (username) => {
  return {
    type: constants.SET_USER_NAME,
    username,
  };
};

export const setRoomId = (id) => {
  return {
    type: constants.SET_ROOM_ID,
    id,
  };
};
