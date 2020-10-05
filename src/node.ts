import * as http from 'http';
import * as https from 'https';
import * as querystring from 'querystring';

import {OttaHttpClientTypes} from './definitions';
import {isHttpsTest, isSuccessTest} from './utils';

export const nodeRequest = (
  request: OttaHttpClientTypes.Request
): Promise<OttaHttpClientTypes.Response> => {
  const isHttps = isHttpsTest(request.url);

  return new Promise((resolve, reject) => {
    const req = (isHttps ? https : http).request(
      request.url,
      {method: request.method, headers: request.headers},
      res => {
        const chunks: Uint8Array[] = [];

        res.on('data', chunk => {
          chunks.push(chunk);
        });

        res.on('end', () => {
          let body = Buffer.concat(chunks).toString();

          try {
            body = JSON.parse(body);
          } catch (e) {
            console.warn('Could not parse body');
          }

          resolve({
            request: {
              success: isSuccessTest(res.statusCode),
              ...request,
            },
            response: {
              status: {
                code: res.statusCode,
                message: res.statusMessage,
              },
              body,
            },
          });
        });

        res.on('error', error => {
          reject(error);
        });
      }
    );

    if (request.body) {
      req.write(
        querystring.stringify(request.body as querystring.ParsedUrlQueryInput)
      );
    }

    req.end();
  });
};
