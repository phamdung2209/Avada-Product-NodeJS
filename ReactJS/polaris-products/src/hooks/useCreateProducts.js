import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

const useCreateProducts = () => {
    const [loading, setLoading] = useState(false)

    const createProduct = useCallback(async (values) => {
        try {
            setLoading(true)
            const res = await fetch('http://localhost:8080/api/products/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })
            const data = await res.json()
            if (data.error) {
                throw new Error(data.error)
            }
        } catch (error) {
            console.log('error', error)
            toast('An error occurred, please try again later!', { icon: '🔥' })
        } finally {
            setLoading(false)
        }
    }, [])

    return { createProduct, loading }
}

export default useCreateProducts
