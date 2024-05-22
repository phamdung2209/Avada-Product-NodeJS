import axios from 'axios';
import {API_VERSION} from '@functions/services/shopifyService';
import {delay} from '@avada/utils';

const client = axios.create();

/**
 * @param url
 * @param method
 * @param options
 * @param params
 * @param resp
 * @return {Promise<any>}
 */
export async function api(url, method = 'GET', options = {}, params = {}, resp = 'data') {
  return client
    .request({
      ...options,
      headers: options.headers || {},
      method,
      url
    })
    .then(res => res[resp]);
}

export async function makeGraphQlApi(
  {graphqlQuery, shopifyDomain, accessToken},
  {apiVersion = API_VERSION, maxRetries = 5} = {}
) {
  const url = `https://${shopifyDomain}/admin/api/${apiVersion}/graphql.json`;
  const headers = {'Content-Type': 'application/json', 'X-Shopify-Access-Token': accessToken};
  const handler = () => api(url, {data: graphqlQuery, method: 'POST', options: {headers}});

  const {errors, ...resp} = await shopifyRetryGraphQL(handler, {maxRetries});
  if (errors) {
    console.error(errors.map(x => x.message).join('. '));
    return {errors};
  }
  return resp;
}

/**
 * @param handler
 * @param maxRetries
 * @param {number} attempt
 * @return {Promise<*|undefined>}
 */
async function shopifyRetryGraphQL(handler, {maxRetries, attempt = 0}) {
  try {
    return await handler();
  } catch (e) {
    attempt++;
    const isRetryError = [502, 503, 520].includes(e.statusCode);
    if (!isRetryError || attempt > maxRetries) {
      throw new Error(e);
    }
    await delay((attempt + Math.random()) * 1000);
    return await shopifyRetryGraphQL(handler, {maxRetries, attempt});
  }
}
