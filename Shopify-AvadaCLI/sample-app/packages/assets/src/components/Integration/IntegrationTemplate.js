import {
  Badge,
  Banner,
  Button,
  Card,
  FormLayout,
  Icon,
  Layout,
  Link,
  List,
  Page,
  Stack
} from '@shopify/polaris';
import React from 'react';
import PropTypes from 'prop-types';
import {getRawSupport} from '@assets/services/crispService';

export default function IntegrationTemplate({app, children}) {
  return (
    <Page
      breadcrumbs={[{url: '/integrations'}]}
      fullWidth
      title={
        <Stack alignment="center" spacing="tight">
          {app.img && <img src={app.img} alt={app.title} width={45} />}
          {app.icon && <Icon source={app.icon} />}
          <Stack.Item>{app.title}</Stack.Item>
        </Stack>
      }
    >
      <Layout>
        <Layout.Section>
          <FormLayout>
            {children}
            <Banner status="info" title={`Cannot integrate with ${app.title}?`}>
              {'Don’t hesitate. '}
              <Button
                plain
                primary
                onClick={() => getRawSupport(`Hi, please help us integrate with ${app.title}`)}
              >
                Contact us for more support
              </Button>
            </Banner>
          </FormLayout>
        </Layout.Section>
        <Layout.Section oneHalf>
          <FormLayout>
            <Button fullWidth external primary url={app.externalUrl}>
              Go to App
            </Button>
            {app.usefulLinks?.length > 0 && (
              <Card>
                <Card.Section title="Useful links">
                  <List>
                    {app.usefulLinks.map((link, key) => (
                      <Link removeUnderline external url={link.url} key={key}>
                        <List.Item>{link.title}</List.Item>
                      </Link>
                    ))}
                  </List>
                </Card.Section>
              </Card>
            )}
            {app.tags?.length > 0 && (
              <Card>
                <Card.Section title="Category">
                  {app.tags.map((tag, key) => (
                    <Badge key={key}>{tag}</Badge>
                  ))}
                </Card.Section>
              </Card>
            )}
          </FormLayout>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

IntegrationTemplate.propTypes = {
  app: PropTypes.object,
  children: PropTypes.node
};
