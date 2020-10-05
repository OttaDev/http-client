/**
 * Checks if URL is `http` or `https`.
 *
 * @param {string} url URL to test.
 * @returns {boolean}
 */
export const isHttpsTest = (url: string): boolean => /^https:\/\//.test(url);

/**
 * Checks if status of request is a success.
 *
 * @param {number} status Status code of request.
 * @returns {boolean}
 */
export const isSuccessTest = (status: number): boolean =>
  status && status < 400;
