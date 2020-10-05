import * as querystring from 'querystring';

import {OttaHttpClientTypes} from './definitions';
import {isSuccessTest} from './utils';

export const browserRequest = (
  request: OttaHttpClientTypes.Request
): Promise<OttaHttpClientTypes.Response> => {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open(request.method, request.url, true);

    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        let body = this.response;

        if (typeof body === 'string') {
          try {
            body = JSON.parse(body);
          } catch (e) {
            console.warn('Could not parse body');
          }
        }

        resolve({
          request: {
            success: isSuccessTest(this.status),
            ...request,
          },
          response: {
            status: {
              code: this.status,
              message: this.statusText,
            },
            body,
          },
        });
      }
    };

    xhttp.onerror = function (error) {
      reject(error);
    };

    if (request.headers) {
      for (const header in request.headers) {
        xhttp.setRequestHeader(header, request.headers[header]);
      }
    }
    if (request.body) {
      xhttp.send(
        querystring.stringify(request.body as querystring.ParsedUrlQueryInput)
      );
    } else {
      xhttp.send();
    }
  });
};
