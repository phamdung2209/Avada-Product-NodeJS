import App from 'koa';
import createErrorHandler from '../middleware/errorHandler';
import * as errorService from '../services/errorService';
import getRoutes from '../routes/api';
import render from 'koa-ejs';
import path from 'path';
import {verifyEmbedRequest} from '@avada/core';
import shopifyConfig from '../config/shopify';
import appConfig from '../config/app';

// Initialize all demand configuration for an application
const api = new App();
api.proxy = true;

api.use(
  verifyEmbedRequest({
    returnHeader: true,
    apiKey: shopifyConfig.apiKey,
    scopes: shopifyConfig.scopes,
    secret: shopifyConfig.secret,
    hostName: appConfig.baseUrl,
    isEmbeddedApp: true,
    accessTokenKey: shopifyConfig.accessTokenKey
  })
);

render(api, {
  cache: true,
  debug: false,
  layout: false,
  root: path.resolve(__dirname, '../../views'),
  viewExt: 'html'
});
api.use(createErrorHandler());

// Register all routes for the application
const router = getRoutes('/api');
api.use(router.allowedMethods());
api.use(router.routes());

// Handling all errors
api.on('error', errorService.handleError);

export default api;
