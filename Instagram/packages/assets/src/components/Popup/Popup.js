import React, { memo } from 'react'

import './Popup.scss'
import { createPortal } from 'react-dom'

const Popup = ({ children, render, onClickOutside, onClick, visible }) => {
    return (
        <>
            {children}
            {createPortal(
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
