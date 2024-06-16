'use client'

import React, { memo, useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

import './FeedItem.scss'
import FeedPreview from '../FeedPreview'
import Popup from '../Popup'
import ImagePreview from './ImagePreview'

const FeedItem = ({ data: { user, media }, valueSettings }) => {
    const dataMemo = useMemo(() => media, [media])
    const [isOpenPreview, setIsOpenPreview] = useState(false)
    const [itemData, setItemData] = useState(dataMemo[0])

    const quantityData = useMemo(() => {
        const { numberRows, numberColumns } = valueSettings
        const quantity = numberRows * numberColumns
        return Math.min(dataMemo.length, quantity)
    }, [dataMemo.length, valueSettings])

    const handleOpenFeedPreview = useCallback((item) => {
        setItemData(item)
        setIsOpenPreview(true)
    }, [])

    const handleCloseFeedPreview = useCallback(() => {
        setIsOpenPreview(false)
    }, [])

    const renderImagePreviews = useMemo(
        () =>
            dataMemo
                .slice(0, quantityData)
                .map((item) => (
                    <ImagePreview
                        item={item}
                        key={item.id}
                        onClick={() => handleOpenFeedPreview(item)}
                    />
                )),
        [dataMemo, quantityData],
    )

    return (
        <div
            className="feed-item__container"
            style={{
                gridTemplateColumns: `repeat(${valueSettings.numberColumns}, 1fr)`,
                gap: `${valueSettings.spacing}px`,
            }}
        >
            <Popup
                render={<FeedPreview data={itemData} feedOwner={user} />}
                visible={isOpenPreview}
                onClickOutside={handleCloseFeedPreview}
            >
                {renderImagePreviews}
            </Popup>
        </div>
    )
}

FeedItem.displayName = 'FeedItem'
FeedItem.propTypes = {
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
