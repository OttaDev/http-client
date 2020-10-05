import {browserRequest} from './browser';
import {nodeRequest} from './node';
import {OttaHttpClientTypes} from './definitions';

type ENVIRONMENT = 'node' | 'browser';

export class OttaHttpClient {
  private _environment: ENVIRONMENT =
    typeof process !== 'undefined' && process.release.name === 'node'
      ? 'node'
      : 'browser';
  private _headers: OttaHttpClientTypes.Headers = {};
  private _history: OttaHttpClientTypes.RequestResponse[] = [];
  private _historyCount = 1;

  /**
   * @param settings Configuration of HTTP client.
   */
  constructor(settings?: OttaHttpClientTypes.Settings) {
    if (settings) {
      if (settings.headers && typeof settings.headers === 'object') {
        this._headers = settings.headers;
      }

      if (
        settings.history &&
        !isNaN(settings.history) &&
        settings.history >= 0
      ) {
        this._historyCount = settings.history;
      }
    }
  }

  /**
   * History of requests and their success/failure status. Length defaults to 1, however this length can be assigned in the constructor.
   *
   * @returns An array of requests made, starting with the most recent.
   */
  get history(): OttaHttpClientTypes.RequestResponse[] {
    return this._history;
  }

  /**
   * Method to make a HTTP request.
   *
   * @param request HTTP request to make.
   * @param replaceHeaders Optional flag to replace headers with headers from request. Otherwise the headers will be merged.
   *
   * @returns Result of request.
   */
  public request(
    request: OttaHttpClientTypes.Request,
    replaceHeaders = false
  ): Promise<OttaHttpClientTypes.Response> {
    if (!request || typeof request !== 'object') {
      throw new Error('Request opject not passed into function.');
    }

    const {method, url, body} = request;
    let headers = this._headers;

    if (replaceHeaders && typeof request.headers === 'object') {
      headers = request.headers;
    } else if (typeof request.headers === 'object') {
      headers = {...this._headers, ...request.headers};
    }

    const parsedRequest: OttaHttpClientTypes.Request = {
      body,
      headers,
      method,
      url,
    };

    return (this._environment === 'node' ? nodeRequest : browserRequest)(
      parsedRequest
    ).then((response: OttaHttpClientTypes.Response) => {
      this._updateHistory(response.request);
      return response;
    });
  }

  /**
   * Updated the request history.
   *
   * @param request Request object to add to history.
   */
  private _updateHistory(request: OttaHttpClientTypes.RequestResponse): void {
    if (this._historyCount !== 0) {
      this._history.unshift(request);
    }

    while (this._history.length > this._historyCount) {
      this._history.pop();
    }
  }
}
