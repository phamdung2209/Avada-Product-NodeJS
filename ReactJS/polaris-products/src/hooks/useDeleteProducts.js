import { useCallback, useState } from 'react'
import { useAppContext } from '~/context/AppContext'

const useDeleteProducts = () => {
    const [loading, setLoading] = useState(false)
    const { setActionDeleteProduct } = useAppContext()

    const deleteProducts = useCallback(
        async (selectedItems = []) => {
            setLoading(true)
            try {
                if (selectedItems.length === 0) {
                    throw new Error('No selected items')
                }

                selectedItems.forEach(async (item) => {
                    const response = await fetch(`http://localhost:8080/api/products/delete/${item}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                    const data = await response.json()

                    if (data.error) {
                        throw new Error(data.error)
                    }
                    setActionDeleteProduct((prev) => prev + 1)
                })
            } catch (error) {
                console.error('Error deleting products:', error)
            } finally {
                setLoading(false)
            }
        },
        [setActionDeleteProduct],
    )

    return { loading, deleteProducts }
}

export default useDeleteProducts
