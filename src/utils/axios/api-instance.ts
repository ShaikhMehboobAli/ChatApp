/* eslint-disable prettier/prettier */
import axios from 'axios';
import {URLS} from '../constants';
import {HEADERS, TIMEOUT} from './app-setting';

export const instance = axios.create({
  baseURL: URLS.publicUrl,
  timeout: TIMEOUT,
  headers: HEADERS,
});

instance.interceptors.request.use(
  async config => {
    return config;
  },
  error => Promise.reject(error),
);
