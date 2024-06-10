import React, { memo } from 'react'
import useGetDataClient from './hooks/useGetDataClient'
import FeedItem from '~/assets/src/components/FeedItem'
import { Loading } from './assets/svg'

const App = () => {
    const { loading, data } = useGetDataClient()
    const { media, setting } = data

    return (
        <>
            <h1
                style={{
                    fontSize: '2.3rem',
                    margin: '1.2rem 0',
                }}
            >
                {setting?.title}
            </h1>

            {loading ? <Loading /> : <FeedItem data={media} valueSettings={setting} />}
        </>
    )
}

App.displayName = 'App'

export default memo(App)
