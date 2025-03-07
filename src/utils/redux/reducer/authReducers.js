import {TOKEN_REQUEST_SENT, SIGNIN_DATA, ROOM_LIST} from '../types';

const initialState = {
  tokenLoading: false,
  userId: '',
  userDetail: {},
  roomList: [],
  flags: {
    locationDetailSuccess: false,
  },
  error: {
    locationDetail: null,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SIGNIN_DATA:
      console.log('SIGNIN_DATA', action.data);
      return {
        ...state,
        userDetail: action.data,
        userId: action?.data?.id,
      };
    case TOKEN_REQUEST_SENT:
      return {
        ...state,
        tokenLoading: action.tokenLoading,
      };

    case ROOM_LIST:
      return {
        ...state,
        roomList: action.data,
      };

    default:
      return state;
  }
}
