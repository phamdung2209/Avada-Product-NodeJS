import React, { Suspense, lazy, memo } from 'react'

import useGetDataClient from './hooks/useGetDataClient'
import { Loading } from './assets/svg'
const FeedItem = lazy(() => import('~/assets/src/components/FeedItem'))

const App = () => {
    const {
        loading,
        data: { media, setting, user },
    } = useGetDataClient()

    if (loading) {
        return <Loading />
    }

    if (media.length) {
        return (
            <Suspense fallback={<Loading />}>
                <FeedItem data={{ media, setting, user }} valueSettings={setting} />
            </Suspense>
        )
    }

    return <p style={{ height: '100%' }}>No media found</p>
}

App.displayName = 'App'

export default memo(App)
