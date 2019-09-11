import { OttaHttpClientTypes } from './definitions';

export const browserRequest = (request: OttaHttpClientTypes.Request): Promise<any> => {
  return new Promise((resolve, reject) => {
    reject(new Error('Browsers are not supported at this time...'));
  });
};
