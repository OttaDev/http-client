/* tslint:disable:no-import-side-effect no-namespace no-shadowed-variable */
export namespace OttaHttpClientTypes {
  export type Headers = {
    [key: string]: string;
  };
  export interface Request {
    body?: unknown;
    headers?: Headers;
    method:
      | 'get'
      | 'GET'
      | 'post'
      | 'POST'
      | 'put'
      | 'PUT'
      | 'delete'
      | 'DELETE'
      | 'patch'
      | 'PATCH';
    url: string;
  }
  export interface RequestResponse extends Request {
    success: boolean;
  }
  export interface Response {
    response: {
      status: {
        code: number;
        message: string;
      };
      body: unknown;
    };
    request: RequestResponse;
  }
  export type Settings = {
    /**
     * Default headers for all requests.
     */
    headers?: Headers;
    /**
     * Amount of requests to store in history. Defaults to 1.
     */
    history?: number;
  };
}
