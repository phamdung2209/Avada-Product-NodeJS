import React, {Suspense} from 'react';
import {Router} from 'react-router-dom';
import ReactRouterLink from '@assets/components/ReactRouterLink';
import {AppProvider} from '@shopify/polaris';
import translations from '@shopify/polaris/locales/en.json';
import {history} from '@assets/history';
import ErrorBoundary from '@assets/components/ErrorBoundary';
import Routes from './routes/routes';
import AppBridgeProvider from '@assets/components/AppBridgeProvider';
import appRoute from '@assets/const/app';
import AppEmbeddedLayout from '@assets/layouts/EmbeddedLayout/AppEmbeddedLayout';
import AppFullLayout from '@assets/layouts/FullLayout/AppFullLayout';
import PropTypes from 'prop-types';
/**
 *
 * @param isEmbedApp
 * @returns {Element}
 * @constructor
 */
export default function App({isEmbedApp = true}) {
  if (isEmbedApp) {
    return (
      <AppProvider i18n={translations} linkComponent={ReactRouterLink}>
        <Router history={history}>
          <Suspense fallback={<div></div>}>
            <AppBridgeProvider>
              <AppEmbeddedLayout>
                <ErrorBoundary>
                  <Routes prefix={appRoute.embed} />
                </ErrorBoundary>
              </AppEmbeddedLayout>
            </AppBridgeProvider>
          </Suspense>
        </Router>
      </AppProvider>
    );
  }

  return (
    <AppProvider
      i18n={translations}
      linkComponent={ReactRouterLink}
      features={{newDesignLanguage: true}}
    >
      <Router history={history}>
        <Suspense fallback={<div></div>}>
          <AppFullLayout routePrefix={appRoute.standalone}>
            <ErrorBoundary>
              <Routes prefix={appRoute.standalone} />
            </ErrorBoundary>
          </AppFullLayout>
        </Suspense>
      </Router>
    </AppProvider>
  );
}

App.propTypes = {
  isEmbedApp: PropTypes.bool
};
