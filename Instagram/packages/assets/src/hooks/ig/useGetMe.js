import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'

import { useAppContext } from '@assets/context/AppContext'

const useGetMe = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    const { isConnectIG, setIsConnectIG } = useAppContext()

    const getIgMe = useCallback(async () => {
        setLoading(true)
        try {
            const data = await axios.get('/ig/me/auth')

            if (data.data.error) {
                throw new Error(data.data.error)
            }

            setData(data.data.data)
            setIsConnectIG(true)
        } catch (error) {
            console.log('Error in getIgMe: ', error.message)
            setIsConnectIG(false)
            setData(null)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (!isConnectIG) return
        getIgMe()
    }, [isConnectIG])

    return { loading, data }
}

export default useGetMe
