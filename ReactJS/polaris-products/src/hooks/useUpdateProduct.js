import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

const useUpdateProduct = () => {
    const [loading, setLoading] = useState(false)

    const updateProduct = useCallback(async (values) => {
        setLoading(true)
        try {
            const response = await fetch(`http://localhost:8080/api/products/update/${values.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })
            const data = await response.json()
            if (data.error) {
                throw new Error(data.error)
            }

            return data
        } catch (error) {
            toast('Failed to update product', { icon: '🔥' })
            console.log('Failed to update product', error)
        } finally {
            setLoading(false)
        }
    }, [])

    return { loading, updateProduct }
}

export default useUpdateProduct
