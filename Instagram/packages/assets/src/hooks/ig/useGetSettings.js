import { useCallback, useEffect, useState } from 'react'

import { useAppContext } from '@assets/context/AppContext'
import * as request from '@assets/helpers/utils/httpRequest'

const useGetSettings = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const { isConnectIG } = useAppContext()

    const fetchData = useCallback(async () => {
        setLoading(true)
        try {
            const data = await request.get('/ig/me/settings')

            if (data.error) {
                throw new Error(data.error)
            }

            setData(data.data)
        } catch (error) {
            console.log('Error in useGetSettings: ', error.message)
        }
        setLoading(false)
    }, [])

    useEffect(() => {
        if (isConnectIG) {
            fetchData()
        }
    }, [isConnectIG])

    return {
        data,
        loading,
    }
}

export default useGetSettings
