import { Layout, LegacyCard, Page } from '@shopify/polaris'
import React, { memo, useRef } from 'react'
import ProductItem from '../components/ProductItem'
import RightPanel from '../components/Settings/RightPanel'
import useEditApi from '@assets/hooks/api/useEditApi'

const Settings = () => {
    const settingsRef = useRef(null)

    const { editing, handleEdit } = useEditApi({
        url: '/apiSa/settings',
        fullResp: true,
    })

    const handleSaveData = async () => {
        const settings = settingsRef.current?.settings
        await handleEdit(settings)
    }

    return (
        <Page
            fullWidth
            title="Settings"
            subtitle="Decide how you notifications will display"
            primaryAction={{
                content: editing ? 'Saving...' : 'Save',
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
