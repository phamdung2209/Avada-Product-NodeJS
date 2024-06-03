import { Layout, LegacyCard, Page } from '@shopify/polaris'
import React, { memo, useRef } from 'react'
import ProductItem from '../components/ProductItem'
import RightPanel from '../components/Settings/RightPanel'
import { fetchAuthenticatedApi } from '../helpers'

const Settings = () => {
    const settingsRef = useRef(null)

    const handleSaveData = async () => {
        const settings = settingsRef.current?.settings
        const res = await fetchAuthenticatedApi('/settings', {
            method: 'PUT',
            body: settings,
        })

        if (!res.success) {
            return
        }
    }

    return (
        <Page
            fullWidth
            title="Settings"
            subtitle="Decide how you notifications will display"
            primaryAction={{
                content: 'Save',
                disabled: false,
                onAction: handleSaveData,
            }}
        >
            <Layout>
                <Layout.Section variant="oneThird">
                    <LegacyCard>
                        <ProductItem />
                    </LegacyCard>
                </Layout.Section>

                <Layout.Section>
                    <LegacyCard>
                        <RightPanel ref={settingsRef} />
                    </LegacyCard>
                </Layout.Section>
            </Layout>
        </Page>
    )
}

export default memo(Settings)
