import React, { memo, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const ToastMessage = ({ notification, setting }) => {
    const { firstName, city, country, productImage, productName, timeAgo } = notification
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
                display: 'flex',
                alignItems: 'start',
                justifyContent: 'space-between',
                padding: '10px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'white',
                gap: '20px',
                position: 'fixed',
                bottom: position === 3 || position === 4 ? '20px' : '',
                right: position === 3 || position === 2 ? '20px' : '',
                left: position === 1 || position === 4 ? '20px' : '',
                top: position === 1 || position === 2 ? '20px' : '',
                zIndex: '9999999',
                minWidth: '200px',
                maxWidth: '350px',
                marginBottom: '10px',
                color: 'black',
                borderRadius: '5px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                transition: 'opacity 0.5s ease-in-out',
                opacity: '1',
                borderRadius: '15px',
                overflow: 'hidden',
            }}
        >
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <img
                    src={productImage}
                    alt=""
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '10px',
                        objectFit: 'cover',
                        fontSize: '1rem',
                    }}
                />
            </div>

            <div
                style={{
                    flex: 3,
                }}
            >
                <strong
                    style={{
                        fontSize: '1.3rem',
                    }}
                >
                    {firstName} in {city + ' ' + country}{' '}
                </strong>
                <p
                    style={{
                        margin: '0',
                        fontSize: '1.2rem',
                    }}
                >
                    Just purchased {productName}
                </p>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        margin: '0',
                        fontSize: '1rem',
                        color: '#666',
                    }}
                >
                    {hideTimeAgo && (
                        <p
                            style={{
                                margin: '0',
                            }}
                        >
                            {timeAgo}
                        </p>
                    )}
                    <div
                        style={{
                            width: '1px',
                            height: '12px',
                            backgroundColor: '#999',
                            display: 'block',
                        }}
                    ></div>
                    <p
                        style={{
                            margin: '0',
                        }}
                    >
                        By Avada
                    </p>
                </div>
            </div>
        </div>
    )
}

ToastMessage.displayName = 'ToastMessage'
ToastMessage.propTypes = {
    notifications: PropTypes.object,
    setting: PropTypes.object,
}

export default memo(ToastMessage)
