import { LegacyCard } from '@shopify/polaris'
import React, { memo } from 'react'
import PropTypes from 'prop-types'

import ContentPreview from './ContentPreview'

const RightPanel = ({ data, loading, isConnectIG }) => {
    return (
        <LegacyCard title="Preview" sectioned>
            <ContentPreview data={data} loading={loading} isConnectIG={isConnectIG} />
        </LegacyCard>
    )
}

RightPanel.displayName = 'RightPanel'
RightPanel.propTypes = {
    data: PropTypes.object,
    loading: PropTypes.bool,
    isConnectIG: PropTypes.bool,
}

export default memo(RightPanel)
