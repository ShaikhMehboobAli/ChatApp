import {
  TOKEN_REQUEST_SENT,
  SIGNIN_DATA,
  ROOM_LIST,
  MESSAGE_LIST,
  MESSAGE_LIST_LOADING,
  ROOM_LIST_LOADING,
  RESET_FLAGS,
  ALL_STATS_DATA,
  ALL_STATS_DATA_LOADING,
} from '../types';

const initialState = {
  tokenLoading: false,
  userId: '',
  userDetail: {},
  roomList: [],
  messageList: [],
  allStatsData: {},
  allStatsDataLoading: false,
  roomListLoading: false,
  messageListLoading: false,
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

    case ROOM_LIST_LOADING:
      return {
        ...state,
        roomListLoading: action.data,
      };

    case MESSAGE_LIST:
      return {
        ...state,
        messageList: action.data,
      };

    case MESSAGE_LIST_LOADING:
      return {
        ...state,
        messageListLoading: action.data,
      };

    case ALL_STATS_DATA:
      return {
        ...state,
        allStatsData: action.data,
      };

    case ALL_STATS_DATA_LOADING:
      return {
        ...state,
        allStatsDataLoading: action.data,
      };
    case RESET_FLAGS:
      return {
        ...state,

        errors: initialState.errors,
        flags: initialState.flags,
      };
    default:
      return state;
  }
}
