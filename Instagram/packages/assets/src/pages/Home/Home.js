import { Layout, Page } from '@shopify/polaris'
import React, { memo } from 'react'

import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import useGetMedia from '@assets/hooks/ig/useGetMedia'

const Home = () => {
    const { loading, getMedia, data } = useGetMedia()

    return (
        <Page fullWidth title="Main feed">
            <Layout>
                <Layout.Section variant="oneThird">
                    <LeftPanel getMedia={getMedia} loading={loading} />
                </Layout.Section>

                <Layout.Section>
                    <RightPanel data={data} />
                </Layout.Section>
            </Layout>
        </Page>
    )
}

export default memo(Home)
