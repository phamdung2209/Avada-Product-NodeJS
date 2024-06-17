import React, { memo } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import './FeedPreview.scss'
import verified from '@assets/resources/images/verified.png'

const FeedPreview = ({ data, feedOwner }) => {
    return (
        <div className="feed-preview__container">
            <section className="feed-preview__image">
                <img src={data.media_url} alt={data.caption} />
            </section>

            <section className="feed-preview__content">
                <div className="feed-preview__header">
                    <img
                        src="https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png"
                        alt={''}
                    />

                    <strong>
                        _{feedOwner.username}
                        <img src={verified} alt="verified" />
                    </strong>

                    <p>
                        {moment(data.timestamp)
                            .startOf('hour')
                            .fromNow()}
                    </p>
                </div>
                <p className="feed-preview__caption">{data?.caption}</p>

                <p
                    className="feed-preview__permalink"
                    onClick={() => window.open(data.permalink, '_blank')}
                >
                    {data.permalink}
                </p>

                <div className="feed-preview__actions">
                    <p>❤️ {data.like_count ?? 0}</p>
                    <p>💬 {data.comment_count ?? 0}</p>
                </div>
            </section>
        </div>
    )
}

FeedPreview.displayName = 'FeedPreview'
FeedPreview.prototype = {
    data: PropTypes.object.isRequired,
    feedOwner: PropTypes.object,
}

export default memo(FeedPreview)
