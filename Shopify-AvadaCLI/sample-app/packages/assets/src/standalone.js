import App from './App';
import React from 'react';
import './styles/app.scss';
import * as ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client';
import * as serviceWorker from './serviceWorker';
import {auth, fetchAuthenticatedApi, pusDataToCrispChat} from './helpers';
import {isEmpty} from '@avada/utils';
import {StoreProvider} from '@assets/reducers/storeReducer';
import loadCrisp from '@assets/helpers/loadCrisp';
import {crispWebsiteId} from '@assets/config/app';

window.isAuthenticated = false;

auth.onAuthStateChanged(async user => {
  if (user === null && !window.isAuthenticated) {
    window.location.href = 'auth/login';
    ReactDOM.render(<div />, document.getElementById('app'));
  } else {
    window.isAuthenticated = true;
    const {data: shop} = await fetchAuthenticatedApi('/shops');

    if (!isEmpty(shop)) {
      const firebaseUser = await auth.currentUser.getIdTokenResult();
      const userCustomClaims = firebaseUser.claims;

      if (!userCustomClaims.isCrmLogin) {
        loadCrisp(crispWebsiteId, shop.crispSessionToken);
        pusDataToCrispChat(shop);
      }
    }
    const loading = document.getElementById('PreLoading');
    if (loading !== null) {
      loading.style.display = 'none';
    }
    const container = document.getElementById('app');
    const root = createRoot(container);
    root.render(
      <StoreProvider {...{user, activeShop: shop}}>
        <App isEmbedApp={false} />
      </StoreProvider>
    );
  }
});

// Register a service worker for PWA application
serviceWorker.register();

if (module.hot) module.hot.accept();
