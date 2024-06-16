import { SkeletonBodyText, SkeletonDisplayText, TextContainer } from '@shopify/polaris'
import React, { Suspense, lazy, memo, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'

import { useAppContext } from '@assets/context/AppContext'
import { SETTINGS } from '@assets/helpers/constants'
import useFetchApi from '@assets/hooks/api/useFetchApi'
const FeedItem = lazy(() => import('@assets/components/FeedItem'))

const ContentPreview = ({ data, loading, isConnectIG }) => {
    const { data: dataSettings } = useFetchApi({
        url: '/settings',
        defaultData: SETTINGS,
        allowFetch: isConnectIG,
    })

    const {
        state: { valueSettings },
        setState,
    } = useAppContext()

    useLayoutEffect(() => {
        setState((prevState) => ({
            ...prevState,
            valueSettings: {
                title: dataSettings.title,
                spacing: dataSettings.spacing,
                layout: dataSettings.layout,
                numberRows: dataSettings.numberRows,
                numberColumns: dataSettings.numberColumns,
            },
        }))
    }, [dataSettings])

    return loading ? (
        <SuspenseContentPreview />
    ) : data?.media?.length ? (
        <Suspense fallback={<SuspenseContentPreview />}>
            <FeedItem data={data} valueSettings={valueSettings} />
        </Suspense>
    ) : null
}

ContentPreview.displayName = 'ContentPreview'
ContentPreview.propTypes = {
    data: PropTypes.object,
    loading: PropTypes.bool,
    isConnectIG: PropTypes.bool,
}

export default memo(ContentPreview)

export const SuspenseContentPreview = memo(() => (
    <TextContainer>
        <SkeletonDisplayText size="small" />
        <SkeletonBodyText />
    </TextContainer>
))
