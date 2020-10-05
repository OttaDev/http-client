import {OttaHttpClientTypes} from './definitions';

export const browserRequest = (): Promise<OttaHttpClientTypes.Response> => {
  return new Promise((resolve, reject) => {
    reject(new Error('Browsers are not supported at this time...'));
  });
};
