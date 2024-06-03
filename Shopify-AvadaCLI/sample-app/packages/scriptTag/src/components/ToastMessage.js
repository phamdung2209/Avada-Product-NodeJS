import React, { memo, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ProductItem from '~/assets/src/components/ProductItem'

const ToastMessage = ({ notification, setting }) => {
    const { firstName, city, country, productImage, productName, timeAgo, timestamp } = notification
    const { position, displayDuration, hideTimeAgo, popsInterval } = setting
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false)
        }, displayDuration * 1000)

        const timerPopsInterval = setTimeout(() => {
            setVisible(true)
        }, popsInterval * 1000)

        return () => {
            clearTimeout(timer)
            clearTimeout(timerPopsInterval)
        }
    }, [displayDuration, notification])

    if (!visible) return null

    return (
        <div
            style={{
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'white',
                position: 'fixed',
                bottom: position === 3 || position === 4 ? '20px' : '',
                right: position === 3 || position === 2 ? '20px' : '',
                left: position === 1 || position === 4 ? '20px' : '',
                top: position === 1 || position === 2 ? '20px' : '',
                zIndex: '9999999',
                // minWidth: '200px',
                // maxWidth: '350px',
                color: 'black',
                transition: 'opacity 0.5s ease-in-out',

                borderRadius: '15px',
                overflow: 'hidden',
            }}
        >
            <ProductItem
                country={country}
                productImage={productImage}
                productName={productName}
                timeAgo={timeAgo}
                timestamp={timestamp}
            />
        </div>
    )
}

ToastMessage.displayName = 'ToastMessage'
ToastMessage.propTypes = {
    notifications: PropTypes.object,
    setting: PropTypes.object,
}

export default memo(ToastMessage)
