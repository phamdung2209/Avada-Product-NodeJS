import { useState } from 'react'

const useCreateProducts = () => {
    const [loading, setLoading] = useState(false)

    const createProduct = async (values) => {
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
            console.log('data', data)
        } catch (error) {
            console.log('error', error)
        } finally {
            setLoading(false)
        }
    }

    return { createProduct, loading }
}

export default useCreateProducts
