import React from 'react';
import {EmptyState, Layout, Page} from '@shopify/polaris';

/**
 * NotFound page is shown when BrowserRoute doesn't match any defined routes
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function NotFound() {
  return (
    <Page title="Not Found" primaryAction={{content: 'Back to Home', url: '/'}}>
      <Layout sectioned>
        <EmptyState
          heading="The page you're looking for couldn't be found"
          action={{content: 'Back to Home', url: '/'}}
          image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
        >
          There is a technical problem with Avada that has prevented this page from loading. Try
          reloading this page or going to another page in Avada. If that does not work, please
          contact to use to support.
        </EmptyState>
      </Layout>
    </Page>
  );
}
