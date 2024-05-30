import App from './App';
import React from 'react';
import './styles/app.scss';
import {createRoot} from 'react-dom/client';
import {fetchAuthenticatedApi, pusDataToCrispChat} from './helpers';
import {isEmpty} from '@avada/utils';
import {StoreProvider} from '@assets/reducers/storeReducer';
import loadCrisp from '@assets/helpers/loadCrisp';
import {crispWebsiteId} from '@assets/config/app';

(async () => {
  const {data: shop} = await fetchAuthenticatedApi('/shops');

  if (!isEmpty(shop)) {
    loadCrisp(crispWebsiteId, shop.crispSessionToken);
    pusDataToCrispChat(shop);
  }

  const loading = document.getElementById('PreLoading');
  if (loading !== null) {
    loading.style.display = 'none';
  }

  const container = document.getElementById('app');
  const root = createRoot(container);

  root.render(
    <StoreProvider
      {...{
        user: {
          email: shop?.email,
          displayName: shop?.firstName
        },
        activeShop: shop
      }}
    >
      <App isEmbedApp={true} />
    </StoreProvider>
  );
})();

if (module.hot) module.hot.accept();
