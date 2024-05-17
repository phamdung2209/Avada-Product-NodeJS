import { Checkbox } from '@shopify/polaris'
import React, { useCallback, useState } from 'react'

const Button = ({
    title,
    outline,
    deleted,
    add,
    checkBox,
    small,
    large,
    medium,
    onClick,
    disabled,
    className,
    props,
}) => {
    const [checked, setChecked] = useState(false)

    const handleChange = useCallback((newChecked) => setChecked(newChecked), [])

    const handleClick = useCallback(() => {
        if (checkBox) {
            setChecked((prevChecked) => !prevChecked)
        }
        if (onClick) {
            onClick()
        }
    }, [checkBox, onClick])

    const classNames = `button flex items-center justify-center ${className} ${outline && 'button--outline'} ${
        deleted && 'button--deleted'
    } ${add && 'button--add'} ${small && 'button--small'} ${large && 'button--large'} ${medium && 'button--medium'} ${
        disabled && 'button--disabled'
    }`

    return (
        <button className={classNames} onClick={handleClick} {...props}>
            {checkBox ? <Checkbox label={title} checked={checked} onChange={handleChange} /> : title}
        </button>
    )
}

export default Button
