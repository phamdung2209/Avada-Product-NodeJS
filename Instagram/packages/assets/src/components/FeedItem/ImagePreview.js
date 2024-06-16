import React, { memo } from 'react'
import moment from 'moment'

import './FeedItem.scss'
import { ViewIcon } from '@assets/resources/icons'

const ImagePreview = ({ item, onClick }) => {
    return (
        <div
            className="feed-item__item"
            onClick={onClick}
            style={{
                height: '200px',
            }}
        >
            {item.media_url && (
                <img
                    src={item.media_url}
                    height={200}
                    className="feed-item__image"
                    alt=""
                    style={{ width: '100%' }}
                    loading="lazy"
                />
            )}

            <div className="feed-item__image--hover">
                <p className="feed-item__text">{moment(item.timestamp).format('LLL')}</p>

                <ViewIcon className="feed-item__icon" />
            </div>
        </div>
    )
}

export default memo(ImagePreview)
