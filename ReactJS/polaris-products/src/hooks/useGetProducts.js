import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useAppContext } from '~/context/AppContext'

const useGetProducts = (sortBy, pagination) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const { actionDeleteProduct } = useAppContext()

    const getProducts = useCallback(async () => {
        setLoading(true)
        try {
            const res = await fetch(
                `http://localhost:8080/api/products/?sortBy=${sortBy}&page=${pagination?.page}&per_page=${pagination?.per_page}`,
            )
            const data = await res.json()

            if (data.error) throw new Error(data.error)

            setData(data.data ?? [])
        } catch (error) {
            console.log('Error in useGetProducts: ', error)
            toast('An error occurred, please try again later!', { icon: '🔥' })
        } finally {
            setLoading(false)
        }
    }, [sortBy, pagination?.page, pagination?.per_page])

    useEffect(() => {
        getProducts()
    }, [actionDeleteProduct, getProducts])

    return { loading, data }
}

export default useGetProducts
