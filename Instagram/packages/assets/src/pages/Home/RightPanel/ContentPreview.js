import { SkeletonBodyText, SkeletonDisplayText, TextContainer } from '@shopify/polaris'
import React, { memo, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'

import useGetMedia from '@assets/hooks/ig/useGetMedia'
import { useAppContext } from '@assets/context/AppContext'
import useGetSettings from '@assets/hooks/ig/useGetSettings'
import { SETTINGS } from '@assets/helpers/constants'
import FeedItem from '@assets/components/FeedItem'

const ContentPreview = ({ data }) => {
    const { loading } = useGetMedia()
    const { data: dataSettings } = useGetSettings()
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
}

export default memo(ContentPreview)

const SuspenseContentPreview = memo(() => (
    <TextContainer>
        <SkeletonDisplayText size="small" />
        <SkeletonBodyText />
    </TextContainer>
))
