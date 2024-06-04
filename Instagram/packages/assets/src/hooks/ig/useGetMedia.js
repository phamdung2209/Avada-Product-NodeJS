import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'

import { useAppContext } from '@assets/context/AppContext'
import useGetMe from './useGetMe'

const useGetMedia = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const { setIsConnectIG, isConnectIG } = useAppContext()
    const { data: igMe } = useGetMe()

    const getMedia = useCallback(async () => {
        setLoading(true)
        try {
            const res = await axios.post('/ig/me/media')

            if (res.error) {
                throw new Error(res.error)
            }

            setData(res?.data.data)
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
    }, [igMe, isConnectIG])

    return { loading, data, getMedia }
}

export default useGetMedia
