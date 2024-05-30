import React from 'react';
import {Button, FooterHelp, Layout} from '@shopify/polaris';
import './Footer.css';

export default function Footer() {
  return (
    <Layout.Section fullWidth>
      <div className="Avada-Footer_Container">
        <div className="Avada-Footer__Body">
          <FooterHelp>
            {'Created by '}
            <Button plain external url="https://mageplaza.com">
              Mageplaza
            </Button>
          </FooterHelp>
        </div>
      </div>
    </Layout.Section>
  );
}
