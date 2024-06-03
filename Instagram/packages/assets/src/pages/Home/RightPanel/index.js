import { LegacyCard } from '@shopify/polaris'
import React, { memo } from 'react'
import ContentPreview from './ContentPreview'

const RightPanel = () => {
    return (
        <LegacyCard title="Preview" sectioned>
            <ContentPreview />
        </LegacyCard>
    )
}

export default memo(RightPanel)
