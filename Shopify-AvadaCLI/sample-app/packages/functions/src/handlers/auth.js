import App from 'koa';
import 'isomorphic-fetch';
import {contentSecurityPolicy, shopifyAuth} from '@avada/core';
import shopifyConfig from '../config/shopify';
import render from 'koa-ejs';
import path from 'path';
import createErrorHandler from '../middleware/errorHandler';
import * as errorService from '../services/errorService';
import firebase from 'firebase-admin';
import appConfig from '../config/app';
import * as installationService from '../services/installationService';
import * as uninstallationService from '../services/uninstallationService';

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
app.use(contentSecurityPolicy(true));

// Register all routes for the application
app.use(
  shopifyAuth({
    accessTokenKey: shopifyConfig.accessTokenKey,
    apiKey: shopifyConfig.apiKey,
    firebaseApiKey: shopifyConfig.firebaseApiKey,
    secret: shopifyConfig.secret,
    scopes: shopifyConfig.scopes,
    initialPlan: {
      features: {},
      id: 'free',
      name: 'Free',
      price: 0,
      trialDays: 0,
      circleDays: 3650
    },
    afterInstall: installationService.installApp,
    afterUninstall: uninstallationService.uninstallApp,
    successRedirect: '/embed/',
    hostName: appConfig.baseUrl,
    isEmbeddedApp: true
  }).routes()
);

// Handling all errors
app.on('error', errorService.handleError);

export default app;
