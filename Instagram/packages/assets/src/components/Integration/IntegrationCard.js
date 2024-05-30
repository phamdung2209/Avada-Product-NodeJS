import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card, Icon, Stack, TextStyle} from '@shopify/polaris';

export default function IntegrationCard({app, handleOpenLink}) {
  return (
    <Card sectioned>
      <AppLink {...{app, handleOpenLink}}>
        <div style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{marginRight: '2rem'}}>
            {app.img && <img src={app.img} alt={app.title} width={45} />}
            {app.icon && <Icon source={app.icon} />}
          </div>
          <Stack vertical spacing="tight">
            <TextStyle variation="strong">{app.title}</TextStyle>
            <TextStyle>{app.description}</TextStyle>
            {app.button && (
              <Button primary disabled={app.status === 'disable'}>
                {app.button}
              </Button>
            )}
          </Stack>
        </div>
      </AppLink>
    </Card>
  );
}

IntegrationCard.propTypes = {
  app: PropTypes.object,
  handleOpenLink: PropTypes.func
};

const AppLink = ({app, handleOpenLink, children}) => {
  return app.url ? (
    <div style={{cursor: 'pointer'}} onClick={() => handleOpenLink(app)}>
      {children}
    </div>
  ) : (
    children
  );
};

AppLink.propTypes = {
  app: PropTypes.object,
  handleOpenLink: PropTypes.func,
  children: PropTypes.any
};
