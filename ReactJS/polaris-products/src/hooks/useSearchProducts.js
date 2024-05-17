import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const useSearchProducts = (queryValue) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    const searchProducts = useCallback(async (search) => {
        try {
            setLoading(true)
            try {
                console.log('search: ', search)
                if (search) {
                    const res = await fetch(`http://localhost:8080/api/products/search?q=${search}`)
                    const data = await res.json()
                    if (data.error) throw new Error(data.error)
                    setData(data.data)
                }
            } catch (error) {
                console.log('Error in useSearchProducts: ', error)
                toast('An error occurred, please try again later!', { icon: '🔥' })
            } finally {
                setLoading(false)
            }
        } catch (error) {
            console.log('Error in useSearchProducts: ', error)
            toast('An error occurred, please try again later!', { icon: '🔥' })
        }
    }, [])

    useEffect(() => {
        if (!queryValue) setData([])

        if (queryValue) searchProducts(queryValue)
    }, [queryValue, searchProducts])

    return { loading, data }
}

export default useSearchProducts
