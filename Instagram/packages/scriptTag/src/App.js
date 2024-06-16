import React, { Suspense, lazy, memo } from 'react'

import useGetDataClient from './hooks/useGetDataClient'
import { Loading } from './assets/svg'
const FeedItem = lazy(() => import('~/assets/src/components/FeedItem'))

const App = () => {
    const { loading, data } = useGetDataClient()
    const { media, setting } = data

    return (
        <>
            <h1 style={{ fontSize: '2.3rem', margin: '1.2rem 0' }}> {setting.title} </h1>

            {loading ? (
                <Loading />
            ) : media.length ? (
                <Suspense fallback={''}>
                    <FeedItem data={data} valueSettings={setting} />
                </Suspense>
            ) : (
                <p>No media found</p>
            )}
        </>
    )
}

App.displayName = 'App'

export default memo(App)
