import { SkeletonBodyText, SkeletonDisplayText, TextContainer } from '@shopify/polaris'
import React, { memo, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'

import { useAppContext } from '@assets/context/AppContext'
import { SETTINGS } from '@assets/helpers/constants'
import FeedItem from '@assets/components/FeedItem'
import useFetchApi from '@assets/hooks/api/useFetchApi'

const ContentPreview = ({ data, loading, isConnectIG }) => {
    const { data: dataSettings } = useFetchApi({
        url: '/apiSa/settings',
        defaultData: SETTINGS,
        allowFetch: isConnectIG,
    })

    const { valueSettings, setValueSettings } = useAppContext()

    useLayoutEffect(() => {
        if (!dataSettings) {
            setValueSettings(SETTINGS)
        } else {
            setValueSettings({
                title: dataSettings.title,
                spacing: dataSettings.spacing,
                layout: dataSettings.layout,
                numberRows: dataSettings.numberRows,
                numberColumns: dataSettings.numberColumns,
            })
        }
    }, [dataSettings])

    return loading ? (
        <SuspenseContentPreview />
    ) : data?.length ? (
        <FeedItem data={data} valueSettings={valueSettings} />
    ) : null
}

ContentPreview.displayName = 'ContentPreview'
ContentPreview.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
    isConnectIG: PropTypes.bool,
}

export default memo(ContentPreview)

const SuspenseContentPreview = memo(() => (
    <TextContainer>
        <SkeletonDisplayText size="small" />
        <SkeletonBodyText />
    </TextContainer>
))
