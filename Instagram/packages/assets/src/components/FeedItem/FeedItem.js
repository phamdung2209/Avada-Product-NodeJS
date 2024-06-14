'use client'

import moment from 'moment'
import React, { memo, useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

import './FeedItem.scss'
import { ViewIcon } from '@assets/resources/icons'
import FeedPreview from '../FeedPreview'
import Popup from '../Popup'

const FeedItem = ({ data, valueSettings }) => {
    const dataMemo = useMemo(() => data.media, [data.media])
    const [isOpenPreview, setIsOpenPreview] = useState(false)
    const [itemData, setItemData] = useState(dataMemo[0])

    const quantityData = useMemo(() => {
        const quantity = valueSettings.numberRows * valueSettings.numberColumns
        return dataMemo.length < quantity ? dataMemo.length : quantity
    }, [dataMemo.length, valueSettings.numberRows, valueSettings.numberColumns])

    const handleOpenFeedPreview = useCallback((item) => {
        setItemData(item)
        setIsOpenPreview(true)
    }, [])

    const handleCloseFeedPreview = useCallback(() => {
        setIsOpenPreview(false)
    }, [])

    return (
        <div
            className="feed-item__container"
            style={{
                gridTemplateColumns: `repeat(${valueSettings.numberColumns}, 1fr)`,
                gap: `${valueSettings.spacing}px`,
            }}
        >
            <Popup
                render={<FeedPreview data={itemData} feedOwner={data.user} />}
                visible={isOpenPreview}
                onClickOutside={handleCloseFeedPreview}
            >
                {dataMemo.slice(0, quantityData).map((item) => (
                    <div
                        key={item.id}
                        className="feed-item__item"
                        onClick={() => handleOpenFeedPreview(item)}
                    >
                        <img
                            src={item.media_url}
                            height={200}
                            className="feed-item__image"
                            alt=""
                            style={{ width: '100%' }}
                            loading="lazy"
                        />

                        <div className="feed-item__image--hover">
                            <p className="feed-item__text">
                                {moment(item.timestamp).format('LLL')}
                            </p>

                            <ViewIcon className="feed-item__icon" />
                        </div>
                    </div>
                ))}
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
