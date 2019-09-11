# OttaDev HTTP Client

## Warning

> This library is very much an **AT YOUR OWN RISK**
>
> This library does not support browsers at this time

## Downloading

You can install via npm:

```bash
npm install @ottadev/http-client
```

## Usage

```javascript
  /**
   * If using ESM syntax
   */
  import { OttaHttpClient } from '@ottadev/http-client';
  /**
   * If using CJS syntax
   */
  const { OttaHttpClient } = require('@ottadev/http-client');

  /**
   * Initialize the HTTP client
   */
  const client = new OttaHttpClient();

  /**
   * Make a request
   */
  client.request({
    url: 'https://google.com',
    method: 'GET'
  })
    .then((data) => {
      /**
       * The original request object, as well as success flag
       */
      data.request;

      /**
       * Result from the request
       */
      data.response;

      /**
       * Status code from request
       */
      data.response.status.code;

      /**
       * Status message from request
       */
      data.response.status.message;

      /**
       * Body from request
       * (We try to return a JSON, otherwise it is a string)
       */
      data.response.body;
    });
  
  /**
   * An array of requests with their success/failure status.
   * Default max length is 1.
   * To have a longer history, initialize OttaHttpClient constructor like this:
   * `const client = new OttaHttpClient({ history: 10 });`
   */
  client.history;
```
