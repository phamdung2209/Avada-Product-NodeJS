import { useCallback, useEffect, useState } from 'react'

import * as request from '~/assets/src/helpers/utils/httpRequest'
import { SETTING } from '~/functions/src/config/settingDefault'

const useGetDataClient = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({ media: [], setting: SETTING })

    const getData = useCallback(async () => {
        setLoading(true)

        try {
            const res = await request.get('https://ig.local.com/client/data', {
                params: {
                    shopifyDomain: window.Shopify.shop,
                },
            })

            if (res.error) throw new Error(res.error)

            setData(res.data)
        } catch (error) {
            console.error('Error in getData', error.message)
            // Optionally set error state here
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
