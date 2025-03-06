/* eslint-disable prettier/prettier */
import axios from 'axios';
import {URLS} from '../constants/urls';
import {HEADERS, TIMEOUT} from './app-setting';

export const publicInstance = axios.create({
  baseURL: URLS.publicUrl,
  timeout: TIMEOUT,
  headers: HEADERS,
});

publicInstance.interceptors.request.use(
  async config => {
    return config;
  },
  error => Promise.reject(error),
);
