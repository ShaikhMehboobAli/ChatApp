/* eslint-disable prettier/prettier */

import {instance} from './api-instance';
import {publicInstance} from './public-api-instance';

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
    const result = await instance.get(url, {params: params || {}});
    // console.log('getAPI-response', result);

    return result;
  } catch (err: any) {
    if (err.response) {
      return err.response;
    }
  }
}

//public api actions
export async function postPublicAPI(url: any, payload: any) {
  try {
    const result = await publicInstance.post(url, payload);
    return result;
  } catch (err: any) {
    if (err.response) {
      return err.response;
    }
  }
}
