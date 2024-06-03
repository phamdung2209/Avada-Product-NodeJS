import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { useAppContext } from '@assets/context/AppContext'

const useGetMedia = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const { isConnectIG, setIsConnectIG } = useAppContext()

    const ress = [
        {
            id: '17895695668004550',
            caption: 'Beautiful sunset at the beach',
            media_type: 'IMAGE',
            media_url:
                'https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg',
            permalink: 'https://www.instagram.com/p/XYZ12345/',
            thumbnail_url: null,
            timestamp: '2023-05-31T12:34:56+0000',
            username: 'exampleuser',
        },
        {
            id: '17895695668004551',
            caption: 'Check out this video!',
            media_type: 'VIDEO',
            media_url:
                'https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg',
            permalink: 'https://www.instagram.com/p/ABC67890/',
            thumbnail_url:
                'https://scontent.cdninstagram.com/v/t51.29350-15/17895695668004551_thumb.jpg',
            timestamp: '2023-05-30T11:33:55+0000',
            username: 'exampleuser',
        },
    ]

    const getMedia = useCallback(async () => {
        setLoading(true)
        try {
            const res = await axios.get('/ig/me/media')

            if (res.error) {
                throw new Error(res.error)
            }

            setData(ress)
            setIsConnectIG(true)
        } catch (error) {
            console.log('Error in getMedia: ', error.message)

            setData([])
            setIsConnectIG(false)
        } finally {
            setLoading(false)
        }
    }, [isConnectIG])

    useEffect(() => {
        if (isConnectIG) {
            getMedia()
        } else {
            setData([])
        }
    }, [isConnectIG])

    return { loading, data }
}

export default useGetMedia
