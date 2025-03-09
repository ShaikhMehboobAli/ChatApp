/* eslint-disable prettier/prettier */
import axios from 'axios';
import {routes, URLS} from '../constants';
import {HEADERS, TIMEOUT} from './app-setting';
import {navigate, resetToScreen} from '@utils/navigation';
import {showErrorToast} from '@utils/toaster/Alerts';

const instance = axios.create({
  baseURL: URLS.publicUrl,
  timeout: TIMEOUT,
  headers: HEADERS,
});

instance.interceptors.response.use(res => {
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
    showErrorToast({
      message: 'Session expired! Please login again to continue.',
    });
    resetToScreen(routes.LoginScreen, 0, {isFromTab: true});
    return res;
  }
  return res;
});

export default instance;
