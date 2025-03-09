/* eslint-disable prettier/prettier */

import axios from 'axios';
import instance from './api-instance';

//app api actions
export async function postAPI(url: any, payload: any) {
  try {
    const result = await instance.post(url, payload);
    return result;
  } catch (err: any) {
    if (err.response) {
      return err.response;
    }
  }
}

export async function getAPI(url: any, params?: any) {
  try {
    const result = await axios.get(url, {params: params || {}});
    // console.log('getAPI-response', result);

    return result;
  } catch (err: any) {
    if (err.response) {
      return err.response;
    }
  }
}
