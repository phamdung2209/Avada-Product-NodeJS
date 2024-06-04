import React from 'react'

const Separator = ({
    width = '1px',
    height = '20px',
    backgroundColor = '#E4E7EB',
    margin = '0 12px',
}) => {
    return (
        <div
            style={{
                width,
                height,
                backgroundColor,
                margin,
                borderRadius: '5px',
                display: 'inline-block',
            }}
        />
    )
}

export default Separator
