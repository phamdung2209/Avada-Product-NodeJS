import {Layout, LegacyCard, Page, Tabs} from '@shopify/polaris';
import React, {memo} from 'react';
import ProductItem from '../components/ProductItem';
import RightPanel from '../components/Settings/RightPanel';

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
                            id={'1'}
                            createdAt={'10-1'}
                            thumbnailUrl={
                                'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg'
                            }
                            name={'name'}
                            description={'des'}
                            publicBy={'10-1'}
                            updatedAt={'11-1'}
                        />
                    </LegacyCard>
                </Layout.Section>

                <Layout.Section>
                    <LegacyCard>
                        <RightPanel />
                    </LegacyCard>
                </Layout.Section>
            </Layout>
        </Page>
    );
};

export default memo(Settings);
