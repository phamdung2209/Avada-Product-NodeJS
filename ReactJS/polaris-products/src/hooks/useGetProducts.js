import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useAppContext } from '~/context/AppContext'

const useGetProducts = ({ sortBy, pagination, ...props }) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const { actionDeleteProduct } = useAppContext()

    const createQueryString = (params) => {
        const searchParams = new URLSearchParams(params)
        return searchParams.toString()
    }

    const getProducts = useCallback(async () => {
        setLoading(true)
        const queryString = createQueryString({
            ...pagination,
            sortBy: sortBy ?? 'desc',
            ...props,
        })

        try {
            const res = await fetch(`http://localhost:8080/api/products/?${queryString}`)
            const data = await res.json()

            if (data.error) throw new Error(data.error)

            setData(data.data ?? [])
        } catch (error) {
            console.log('Error in useGetProducts: ', error)
            toast('An error occurred, please try again later!', { icon: '🔥' })
        } finally {
            setLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortBy, pagination, props.q])

    useEffect(() => {
        getProducts()
    }, [actionDeleteProduct, getProducts])

    return { loading, data, getProducts }
}

export default useGetProducts
