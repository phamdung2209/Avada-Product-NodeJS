import { useCallback, useEffect, useState } from 'react'

const useGetSettings = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    const shopifyDomain = window.location.hostname

    const getSettings = useCallback(async () => {
        setLoading(true)
        try {
            const res = await fetch(
                `https://localhost:3000//client-api/shopify-domain?shopifyDomain=${shopifyDomain}`,
            )
            const data = await res.json()
            if (res.error) {
                throw new Error(data.error)
            }

            setData(data.data)
        } catch (error) {
            console.error('Error in getSettings', error.message)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (shopifyDomain) {
            getSettings()
        }
    }, [])

    return { loading, data }
}

export default useGetSettings
