/* eslint-disable prettier/prettier */

import {publicInstance} from './public-api-instance';

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
