import { Layout, Text, Page, LegacyCard, InlineStack, Button } from '@shopify/polaris'
import React from 'react'

import { SETTINGS } from '@assets/config/settings'
import useFetchApi from '@assets/hooks/api/useFetchApi'
import useCreateApi from '@assets/hooks/api/useCreateApi'
import useEditApi from '@assets/hooks/api/useEditApi'

const Home = () => {
    const {
        data: { enable },
        loading,
        fetchApi,
    } = useFetchApi({
        url: '/apiSa/settings',
        defaultData: SETTINGS,
    })

    const { editing, handleEdit } = useEditApi({
        url: '/apiSa/settings',
        fullResp: true,
    })

    const handleToggleEnable = async () => {
        await handleEdit({
            enable: !enable,
        })
        await fetchApi()
    }

    return (
        <Page title="Home" fullWidth>
            <Layout>
                <Layout.Section>
                    <LegacyCard sectioned>
                        <InlineStack align="space-between" blockAlign="center">
                            <InlineStack gap={100}>
                                App status is{' '}
                                <Text fontWeight="medium">
                                    {loading ? '...' : enable ? 'Enabled' : 'Disabled'}
                                </Text>
                            </InlineStack>

                            <Button
                                primary
                                onClick={handleToggleEnable}
                                variant={enable ? 'secondary' : 'primary'}
                            >
                                {enable
                                    ? editing
                                        ? 'Disabling...'
                                        : 'Disable'
                                    : editing
                                    ? 'Enabling...'
                                    : 'Enable'}
                            </Button>
                        </InlineStack>
                    </LegacyCard>
                </Layout.Section>
            </Layout>
        </Page>
    )
}

Home.displayName = 'Home'

export default Home
