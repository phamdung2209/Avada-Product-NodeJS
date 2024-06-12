import React, { memo, useEffect, useState } from 'react'
import './Popup.scss'
import { createPortal } from 'react-dom'

const Popup = ({ children, render, onClickOutside, onClick, visible }) => {
    const [shouldRender, setShouldRender] = useState(visible)

    useEffect(() => {
        if (visible) {
            setShouldRender(true)
        } else {
            const timer = setTimeout(() => {
                setShouldRender(false)
            }, 400)

            return () => clearTimeout(timer)
        }
    }, [visible])

    return (
        <>
            {children}
            {shouldRender &&
                createPortal(
                    <div
                        className={`popup__container ${
                            visible ? 'popup__container--visible' : 'popup__container--hidden'
                        }`}
                        onClick={onClickOutside}
                    >
                        <div
                            className="popup__content"
                            onClick={(e) => {
                                e.stopPropagation()
                                onClick && onClick()
                            }}
                        >
                            {render}
                        </div>
                    </div>,
                    document.body,
                )}
        </>
    )
}

export default memo(Popup)
