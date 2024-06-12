import { Layout, Page } from '@shopify/polaris'
import React, { memo } from 'react'

import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import useFetchApi from '@assets/hooks/api/useFetchApi'
import { useAppContext } from '@assets/context/AppContext'

const Home = () => {
    const {
        state: { isConnectIG },
    } = useAppContext()

    const { loading, data, fetchApi: getMedia } = useFetchApi({
        url: '/media',
        defaultData: {},
        allowFetch: isConnectIG,
        isResetData: !isConnectIG,
    })

    return (
        <Page fullWidth title="Main feed">
            <Layout>
                <Layout.Section variant="oneThird">
                    <LeftPanel getMedia={getMedia} loading={loading} />
                </Layout.Section>

                <Layout.Section>
                    <RightPanel data={data} loading={loading} isConnectIG={isConnectIG} />
                </Layout.Section>
            </Layout>
        </Page>
    )
}

export default memo(Home)
