import axios from 'axios';
import createApp from '@shopify/app-bridge';
import {authenticatedFetch, isShopifyEmbedded} from '@shopify/app-bridge-utils';
import {Redirect} from '@shopify/app-bridge/actions';
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import appRoute from '@assets/const/app';

const app = initializeApp({
  appId: process.env.FIREBASE_APP_ID,
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

export const auth = getAuth(app);
export const embedApp = createEmbedApp();
export const client = axios.create({baseURL: '/api', timeout: 60000});
export const fetchAuthenticatedApi = getAuthenticatedFetchApi();

if (module.hot) module.hot.accept();

export function createEmbedApp() {
  const host = new URL(location).searchParams.get('host');
  if (!host) return;
  return createApp({
    apiKey: process.env.SHOPIFY_API_KEY,
    host,
    forceRedirect: true
  });
}

/**
 * @return {(uri: string, options?: {headers?, body?, method?: 'GET' | 'POST' | 'PUT' | 'DELETE'}) => Promise<any>}
 */
export async function api({
  url,
  data = {},
  method = 'GET',
  options = {},
  params = {},
  clientConfig = {
    baseURL: '/apiSa',
    timeout: 60000
  }
}) {
  const idToken = await auth.currentUser.getIdToken(false);
  const clientObj = axios.create(clientConfig);

  return clientObj
    .request({
      ...options,
      headers: {
        accept: 'application/json',
        ...(options.headers || {}),
        'x-auth-token': idToken
      },
      url,
      method,
      data,
      params
    })
    .then(res => res?.data);
}

export function getAuthenticatedFetchApi() {
  if (isEmbeddedApp()) {
    const app = embedApp;
    const fetchFunction = authenticatedFetch(app);

    return async (uri, options = {}) => {
      if (options.body) {
        options.body = JSON.stringify(options.body);
        options.headers = options.headers || {};
        options.headers['Content-Type'] = 'application/json';
      }
      const response = await fetchFunction('/api' + uri, options);
      checkHeadersForReauthorization(response.headers, app);
      return await response.json();
    };
  }

  const fetchFunction = api;

  return async (uri, options = {}) => {
    return fetchFunction({
      url: uri,
      data: options.body,
      method: options.method
    });
  };
}

function checkHeadersForReauthorization(headers, app) {
  if (headers.get('X-Shopify-API-Request-Failure-Reauthorize') === '1') {
    const authUrlHeader =
      headers.get('X-Shopify-API-Request-Failure-Reauthorize-Url') || `/api/auth`;
    console.log(
      app,
      Redirect.Action.REMOTE,
      `https://${window.location.host}${authUrlHeader}`,
      authUrlHeader,
      authUrlHeader.startsWith('/')
    );
    const redirect = Redirect.create(app);
    redirect.dispatch(
      Redirect.Action.REMOTE,
      authUrlHeader.startsWith('/')
        ? `https://${window.location.host}${authUrlHeader}`
        : authUrlHeader
    );
  }
}

export function pusDataToCrispChat(shop) {
  if (!window.$crisp) return;
  $crisp.push(['set', 'user:email', [shop.email]]);
  $crisp.push(['set', 'user:nickname', [shop.firstName]]);
  $crisp.push([
    'set',
    'session:data',
    [
      [
        ['name', shop.name],
        ['email', shop.email],
        ['app_name', 'Mageplaza Instagram Feed'],
        ['url', `https://${shop.shopifyDomain}`],
        ['plan', shop.plan || 'free']
      ]
    ]
  ]);
  $crisp.push(['set', 'session:segments', [['app_mp_if']]]);
}

export function isEmbeddedApp() {
  return isShopifyEmbedded() || window.location.pathname.startsWith(appRoute.embed);
}
