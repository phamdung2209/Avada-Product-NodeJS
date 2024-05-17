import { useEffect, useState } from 'react'

const useDebounce = (value, delay) => {
    const [debounceValue, setDebounceValue] = useState(value)

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            setDebounceValue(value)
        }, delay)

        return () => {
            clearTimeout(delaySearch)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    return debounceValue
}

export default useDebounce
