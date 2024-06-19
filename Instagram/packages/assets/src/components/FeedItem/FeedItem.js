'use client'

import React, { Suspense, forwardRef, lazy, memo, useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

import './FeedItem.scss'
import FeedPreview from '../FeedPreview'
const ImagePreview = lazy(() => import('./ImagePreview'))
const Popup = lazy(() => import('../Popup'))

const FeedItem = ({ data: { user, media }, valueSettings }) => {
    const [isOpenPreview, setIsOpenPreview] = useState(false)
    const [itemData, setItemData] = useState(media[0])

    const quantityData = useMemo(() => {
        const { numberRows, numberColumns } = valueSettings
        return Math.min(media.length, numberRows * numberColumns)
    }, [media.length, valueSettings])

    const handleOpenFeedPreview = useCallback((item) => {
        setItemData(item)
        setIsOpenPreview(true)
    }, [])

    const handleCloseFeedPreview = useCallback(() => {
        setIsOpenPreview(false)
    }, [])

    const renderImagePreviews = useMemo(
        () =>
            media
                .slice(0, quantityData)
                .map((item) => (
                    <ImagePreview
                        key={item.id}
                        item={item}
                        onClick={() => handleOpenFeedPreview(item)}
                    />
                )),
        [media, quantityData, handleOpenFeedPreview],
    )

    return (
        <div
            className="feed-item__container"
            style={{
                gridTemplateColumns: `repeat(${valueSettings.numberColumns}, 1fr)`,
                gap: `${valueSettings.spacing}px`,
            }}
        >
            <Suspense fallback="Loading...">{renderImagePreviews}</Suspense>
            <Popup
                render={<FeedPreview data={itemData} feedOwner={user} />}
                visible={isOpenPreview}
                onClickOutside={handleCloseFeedPreview}
            />
        </div>
    )
}

FeedItem.displayName = 'FeedItem'
FeedItem.prototype = {
    data: PropTypes.shape({
        media: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string,
                media_url: PropTypes.string,
                timestamp: PropTypes.string,
            }),
        ).isRequired,
        user: PropTypes.object.isRequired,
    }).isRequired,
    valueSettings: PropTypes.object,
}

export default memo(FeedItem)
