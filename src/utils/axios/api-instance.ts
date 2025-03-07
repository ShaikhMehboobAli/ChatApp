/* eslint-disable prettier/prettier */
import axios from 'axios';
import {identifiers, routes, URLS} from '../constants';
import {HEADERS, TIMEOUT} from './app-setting';
import {navigate} from '@utils/navigation';
import {fetchFromEncryptedStorage} from '@utils/storage/storage';

export const instance = axios.create({
  baseURL: URLS.publicUrl,
  timeout: TIMEOUT,
  headers: HEADERS,
});

// instance.interceptors.request.use(
//   async config => {
//     // const token = await fetchFromEncryptedStorage(identifiers.accessToken);
//     // console.log('token---', token);
//     // if (token) {
//     //   config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
//     // }
//     // if (config.data instanceof FormData) {
//     //   config.headers['Content-Type'] = 'multipart/form-data';
//     // }
//     return config;
//   },
//   error => Promise.reject(error),
// );

instance.interceptors.response.use(res => {
  console.log('res inter---', res.status);
  if (!res || typeof res === 'undefined') {
    return 'Server not responding!';
  }
  if (res.data.Error && res.data.Error.ErrorMessage) {
    if (
      res.data.Error &&
      res.data.Error.ErrorCode &&
      res.data.Error.ErrorCode === 10004
    ) {
      navigate(routes.LoginScreen);
    }
    return res.data.Error.ErrorMessage;
  }
  if (res.data.message && res.data.message === 'Forbidden') {
    navigate(routes.LoginScreen);
    return res;
  }

  if (res.status == 401) {
    console.log();
    // onLogout();
    return res;
  }
  return res;
});
