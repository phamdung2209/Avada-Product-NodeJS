import { useCallback, useEffect, useState } from 'react'

import { useAppContext } from '@assets/context/AppContext'
import useGetMe from './useGetMe'
import * as request from '@assets/helpers/utils/httpRequest'

const useGetMedia = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const { setIsConnectIG, isConnectIG } = useAppContext()
    const { data: igMe } = useGetMe()

    const getMedia = useCallback(async () => {
        setLoading(true)
        try {
            const res = await request.post('/ig/me/media')

            if (res.error) {
                throw new Error(res.error)
            }

            setData(res?.data.slice(0, 30))
        } catch (error) {
            console.log('Error in getMedia: ', error.message)

            setData([])
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (!igMe?.success && !isConnectIG) {
            setIsConnectIG(false)
            setData([])
        } else {
            getMedia()
        }
    }, [isConnectIG])

    return { loading, data, getMedia }
}

export default useGetMedia
