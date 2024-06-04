import { useAppContext } from '@assets/context/AppContext'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'

const useGetSettings = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const { isConnectIG } = useAppContext()

    const fetchData = useCallback(async () => {
        setLoading(true)
        try {
            const data = await axios.get('/ig/me/settings')

            if (data.data.error) {
                throw new Error(data.data.error)
            }

            setData(data.data.data)
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
