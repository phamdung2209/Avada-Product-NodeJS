import { LegacyCard } from '@shopify/polaris'
import React, { memo } from 'react'
import PropTypes from 'prop-types'

import ContentPreview from './ContentPreview'

const RightPanel = ({ data }) => {
    return (
        <LegacyCard title="Preview" sectioned>
            <ContentPreview data={data} />
        </LegacyCard>
    )
}

RightPanel.displayName = 'RightPanel'
RightPanel.propTypes = {
    data: PropTypes.array,
}

export default memo(RightPanel)
