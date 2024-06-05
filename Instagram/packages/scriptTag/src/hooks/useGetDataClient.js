import { useCallback, useEffect, useState } from 'react'
import * as request from '~/assets/src/helpers/utils/httpRequest'

const useGetDataClient = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        media: [],
        setting: {},
    })

    const getData = useCallback(async () => {
        setLoading(true)
        const shopifyDomain = window.location.hostname
        try {
            const res = await request.get('https://ig.local.com/client/data', {
                params: {
                    shopifyDomain,
                },
            })

            if (res.error) throw new Error(res.error)

            setData(res.data)
        } catch (error) {
            console.error('Error in getData', error.message)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        getData()
    }, [])

    return { loading, data }
}

export default useGetDataClient
