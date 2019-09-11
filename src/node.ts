import * as http from 'http';
import * as https from 'https';
import * as querystring from 'querystring';

import { OttaHttpClientTypes } from './definitions';

export const nodeRequest = (request: OttaHttpClientTypes.Request): Promise<OttaHttpClientTypes.Response> => {
  const isHttps = /^https:\/\//.test(request.url);

  return new Promise((resolve, reject) => {
    const req = (isHttps ? https : http).request(
      request.url,
      { method: request.method, headers: request.headers },
      (res) => {
        const chunks = [];

        res.on('data', (chunk) => {
          chunks.push(chunk);
        });

        res.on('end', () => {
          let body = Buffer.concat(chunks).toString();

          try {
            body = JSON.parse(body);
          } catch (e) {}

          resolve({
            request: {
              success: (res.statusCode && res.statusCode < 400),
              ...request
            },
            response: {
              status: {
                code: res.statusCode,
                message: res.statusMessage
              },
              body
            }
          });
        });

        res.on('error', (error) => {
          reject(error);
        });
      });

    if (request.body) {
      req.write(querystring.stringify(request.body));
    }

    req.end();
  });
};
