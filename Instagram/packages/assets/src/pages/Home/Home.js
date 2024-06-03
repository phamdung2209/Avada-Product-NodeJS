import { Layout, Page } from '@shopify/polaris'
import React, { memo } from 'react'

import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'

const Home = () => {
    return (
        <Page fullWidth title="Main feed">
            <Layout>
                <Layout.Section variant="oneThird">
                    <LeftPanel />
                </Layout.Section>

                <Layout.Section>
                    <RightPanel />
                </Layout.Section>
            </Layout>
        </Page>
    )
}

export default memo(Home)
