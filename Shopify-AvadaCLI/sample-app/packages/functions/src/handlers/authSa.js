import App from 'koa';
import 'isomorphic-fetch';
import {shopifyAuth} from '@avada/core';
import shopifyConfig from '../config/shopify';
import render from 'koa-ejs';
import path from 'path';
import firebase from 'firebase-admin';
import appConfig from '../config/app';
import * as errorService from '../services/errorService';
import createErrorHandler from '../middleware/errorHandler';
import * as uninstallationService from '../services/uninstallationService';
import * as installationService from '../services/installationService';

if (firebase.apps.length === 0) {
  firebase.initializeApp();
}

// Initialize all demand configuration for an application
const app = new App();
app.proxy = true;

render(app, {
  cache: true,
  debug: false,
  layout: false,
  root: path.resolve(__dirname, '../../views'),
  viewExt: 'html'
});
app.use(createErrorHandler());

// Register all routes for the application
app.use(
  shopifyAuth({
    accessTokenKey: shopifyConfig.accessTokenKey,
    apiKey: shopifyConfig.apiKey,
    firebaseApiKey: shopifyConfig.firebaseApiKey,
    initialPlan: {
      features: {},
      id: 'free',
      name: 'Free',
      price: 0,
      trialDays: 0,
      circleDays: 3650
    },
    scopes: shopifyConfig.scopes,
    secret: shopifyConfig.secret,
    successRedirect: '/',
    hostName: appConfig.baseUrl,
    prefix: '/authSa',
    isEmbeddedApp: false
  }).routes()
);

// Handling all errors
app.on('error', errorService.handleError);

export default app;
