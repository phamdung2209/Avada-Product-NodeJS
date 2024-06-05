import React, { memo } from 'react'
import useGetDataClient from './hooks/useGetDataClient'
import FeedItem from '~/assets/src/components/FeedItem'
import { Page, SkeletonBodyText, SkeletonDisplayText, TextContainer } from '@shopify/polaris'

const App = () => {
    const { loading, data } = useGetDataClient()
    const { media, setting } = data

    return (
        <Page title={setting.title} fullWidth>
            {loading ? (
                <TextContainer>
                    <SkeletonDisplayText size="extraLarge" />
                    <SkeletonBodyText />
                </TextContainer>
            ) : (
                <FeedItem data={media} valueSettings={setting} />
            )}
        </Page>
    )
}

App.displayName = 'App'

export default memo(App)
