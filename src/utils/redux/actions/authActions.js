import * as StoreTypes from '../types';

import {navigationRef} from 'navigations/NavigationReadyToUse';
import {CommonActions} from '@react-navigation/native';
import {
  fetchFromEncryptedStorage,
  removeFromEncryptedStorage,
} from '@utils/storage/storage';
import {identifiers, routes} from '@utils/constants';
import {showErrorToast} from '@utils/toaster/Alerts';
import instance from '@utils/axios/api-instance';
import {resetToScreen} from '@utils/navigation';

export function showProcessing(isProcessing = false) {
  return {
    type: 'Hello',
    isProcessing,
  };
}

export const logout = () => async dispatch => {
  console.log('hello');
  try {
    await removeFromEncryptedStorage(identifiers.loginUserDetails);
    await removeFromEncryptedStorage(identifiers.userId);

    dispatch({
      type: StoreTypes.SIGNIN_DATA,
      userId: null,
      userDetail: null,
    });
    dispatch({type: StoreTypes.RESET_FLAGS});

    resetToScreen(routes.LoginScreen);

    return true;
  } catch (error) {
    console.error('Logout error:', error);
    //Sentry.captureException(error);
    // showErrorToast({message: 'Error during logout'});
    return false;
  }
};

export const isAuthenticated = () => async dispatch => {
  dispatch({
    type: StoreTypes.TOKEN_REQUEST_SENT,
    tokenLoading: true,
  });

  try {
    const userDetail = await fetchFromEncryptedStorage(
      identifiers.loginUserDetails,
    );
    const token = await fetchFromEncryptedStorage(identifiers.userId);

    // If any essential auth data is missing, logout
    if (!token || !userDetail) {
      console.log('Missing required auth data');
      await logout()(dispatch);
      dispatch({
        type: StoreTypes.TOKEN_REQUEST_SENT,
        tokenLoading: false,
      });
      return;
    }

    try {
      const parsedToken = JSON.parse(token);
      const parsedUserDetail = JSON.parse(userDetail);

      if (!parsedToken || !parsedUserDetail) {
        console.log('Auth state not authenticated');
        await logout()(dispatch);
        return;
      }
      console.log('parsedToken0000', parsedUserDetail.username);
      dispatch({
        type: StoreTypes.SIGNIN_DATA,
        data: parsedUserDetail,
      });
      dispatch({
        type: StoreTypes.TOKEN_REQUEST_SENT,
        tokenLoading: false,
      });
    } catch (parseError) {
      dispatch({
        type: StoreTypes.TOKEN_REQUEST_SENT,
        tokenLoading: false,
      });
      console.error('Error parsing auth data:', parseError);
      await logout()(dispatch);
    }
  } catch (error) {
    dispatch({
      type: StoreTypes.TOKEN_REQUEST_SENT,
      tokenLoading: false,
    });
    console.error('Auth check error:', error);
    //Sentry.captureException(error);
    await logout()(dispatch);
  }
};

export const fetchRoomList = (retryCount, e) => async dispatch => {
  if (e === 'loader') {
    dispatch(showProcessing(true));
    dispatch({
      type: StoreTypes.ROOM_LIST_LOADING,
      data: true,
    });
  }

  try {
    const response = await instance.get('rooms', {});
    // console.log('response room---', response?.data);

    if (response.status === 200 || response.status === 201) {
      dispatch({
        type: StoreTypes.ROOM_LIST,
        data: response.data,
      });
      if (e === 'loader') {
        dispatch({
          type: StoreTypes.ROOM_LIST_LOADING,
          data: false,
        });
      }
    } else {
      showErrorToast({message: response.data.detail[0].msg});
      if (e === 'loader') {
        dispatch({
          type: StoreTypes.ROOM_LIST_LOADING,
          data: false,
        });
      }
    }
  } catch (err) {
    console.error('room list errr:', err);
    // dispatch(showProcessing(false));

    dispatch({
      type: StoreTypes.ROOM_LIST_LOADING,
      data: false,
    });

    // showErrorToast({message: err});

    return {success: false};
  }
};

export const fetchMessageList = id => async dispatch => {
  dispatch(showProcessing(true));

  dispatch({
    type: StoreTypes.MESSAGE_LIST_LOADING,
    data: true,
  });
  try {
    const response = await instance.get('rooms/' + id + '/messages', {});
    // console.log('response room---', response?.data);

    if (response.status === 200 || response.status === 201) {
      dispatch({
        type: StoreTypes.MESSAGE_LIST,
        data: response.data,
      });
      dispatch({
        type: StoreTypes.MESSAGE_LIST_LOADING,
        data: false,
      });
    } else {
      dispatch({
        type: StoreTypes.MESSAGE_LIST_LOADING,
        data: false,
      });
      showErrorToast({message: response.data.detail[0].msg});
    }
  } catch (err) {
    console.error('message fetch errr:', err);
    dispatch({
      type: StoreTypes.MESSAGE_LIST_LOADING,
      data: false,
    });

    // showErrorToast({message: 'Could not fetch message'});
    return {success: false};
  }
};

export const allStats = id => async dispatch => {
  dispatch(showProcessing(true));

  dispatch({
    type: StoreTypes.ALL_STATS_DATA_LOADING,
    data: true,
  });
  try {
    const response = await instance.get('stats', {
      baseURL: 'https://chat-api-k4vi.onrender.com/',
    });
    // console.log('response room---', response?.data);

    if (response.status === 200 || response.status === 201) {
      dispatch({
        type: StoreTypes.ALL_STATS_DATA,
        data: response.data,
      });
      dispatch({
        type: StoreTypes.ALL_STATS_DATA_LOADING,
        data: false,
      });
    } else {
      dispatch({
        type: StoreTypes.ALL_STATS_DATA_LOADING,
        data: false,
      });
      showErrorToast({message: response.data.detail[0].msg});
    }
  } catch (err) {
    console.error('message fetch errr:', err);
    dispatch({
      type: StoreTypes.ALL_STATS_DATA_LOADING,
      data: false,
    });

    // showErrorToast({message: 'Could not fetch message'});
    return {success: false};
  }
};
