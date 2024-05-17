import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const useSearchProducts = (queryValue) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        try {
            const searchProducts = async (search) => {
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
            }

            if (queryValue) searchProducts(queryValue)

            if (!queryValue) setData([])
        } catch (error) {}
    }, [queryValue])

    return { loading, data }
}

export default useSearchProducts
