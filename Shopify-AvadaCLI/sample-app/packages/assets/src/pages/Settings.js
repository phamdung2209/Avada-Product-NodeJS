import {Layout, LegacyCard, Page} from '@shopify/polaris';
import React from 'react';
import ProductItem from '../components/ProductItem';

const Settings = () => {
    return (
        <Page
            fullWidth
            title="Settings"
            subtitle="Decide how you notifications will display"
            primaryAction={{
                content: 'Save',
                disabled: false,
                onAction: () => {
                    console.log('Save');
                }
            }}
        >
            <Layout>
                <Layout.Section variant="oneThird">
                    <LegacyCard>
                        <ProductItem
                            name={'name'}
                            description={'des'}
                            publicBy={'10-1'}
                            updatedAt={'11-1'}
                        />
                    </LegacyCard>
                </Layout.Section>

                <Layout.Section>
                    <LegacyCard>
                        <ProductItem
                            name={'name'}
                            description={'des'}
                            publicBy={'10-1'}
                            updatedAt={'11-1'}
                        />
                    </LegacyCard>
                </Layout.Section>
            </Layout>
        </Page>
    );
};

export default Settings;
