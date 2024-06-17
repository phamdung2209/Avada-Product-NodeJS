import React, { memo, useRef, useEffect, useMemo } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'

import './FeedItem.scss'
import { ViewIcon } from '@assets/resources/icons'

const ImagePreview = ({ item, onClick }) => {
    const canvasRef = useRef(null)
    const data = useMemo(() => item, [item])

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        const img = new Image()
        img.src = data.media_url
        img.className = 'feed-item__image'
        img.onload = () => {
            const aspectRatio = img.width / img.height
            canvas.width = canvas.clientWidth
            canvas.height = canvas.width / aspectRatio
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        }
    }, [data.media_url])

    return (
        <div className="feed-item__item" onClick={onClick} style={{ height: 'auto' }}>
            <canvas ref={canvasRef} className="feed-item__canvas" />

            <div className="feed-item__image--hover">
                <p className="feed-item__text">{moment(data.timestamp).format('LLL')}</p>
                <ViewIcon className="feed-item__icon" />
            </div>
        </div>
    )
}

ImagePreview.displayName = 'ImagePreview'
ImagePreview.propTypes = {
    item: PropTypes.shape({
        media_url: PropTypes.string.isRequired,
        timestamp: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
}

export default memo(ImagePreview)
