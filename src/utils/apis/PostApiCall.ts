import {postAPI} from '@utils/axios/api-actions';
import {identifiers, routes, URLS} from '@utils/constants';
import {navigate, resetToScreen} from '@utils/navigation';
import {AppDispatch} from '@utils/redux';
import {fetchRoomList} from '@utils/redux/actions/authActions';
import {SIGNIN_DATA} from '@utils/redux/types';
import {saveToSecureStorage} from '@utils/storage/storage';
import {showErrorToast, showSuccessToast} from '@utils/toaster/Alerts';

const loginUser = async (payload: any, dispatch: any): Promise<any[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await postAPI('username', payload);
      const {data, headers, status} = response;
      console.log('response-----------', data);

      if (status === 200 || status === 201) {
        showSuccessToast({message: 'Login Success'});
        dispatch({
          type: SIGNIN_DATA,
          data: data,
        });
        saveToSecureStorage(identifiers.userId, data?.id);
        saveToSecureStorage(identifiers.loginUserDetails, data);
        resetToScreen(routes.HomeScreen);
      } else {
        console.log('errr');
        showErrorToast({
          message: data?.detail[0]?.msg || 'Something went wrong',
        });
      }

      resolve(data);
      //   }
    } catch (error) {
      console.log('error', error);
      showErrorToast({message: error?.response?.data?.message});

      reject(error);
    }
  });
};

const createRoom = async (payload: any, dispatch: any): Promise<any[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await postAPI('rooms', payload);
      const {data, headers, status} = response;
      console.log('response-----------', data);

      if (status === 200 || status === 201) {
        showSuccessToast({message: 'Room created success'});
        dispatch(fetchRoomList());
      } else {
        console.log('errr');
        showErrorToast({
          message: data?.detail[0]?.msg || 'Something went wrong',
        });
      }

      resolve(data);
      //   }
    } catch (error) {
      console.log('error create room', error);
      showErrorToast({message: error?.response?.data?.message});

      reject(error);
    }
  });
};

export {loginUser, createRoom};
