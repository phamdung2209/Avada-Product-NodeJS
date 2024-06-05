import { Box, Grid, Icon, Text } from '@shopify/polaris'
import moment from 'moment'
import React, { memo, useCallback, useEffect, useMemo } from 'react'
import { ViewIcon } from '@shopify/polaris-icons'
import PropTypes from 'prop-types'

import './FeedItem.scss'

const FeedItem = ({ data, valueSettings }) => {
    // fake data
    const dataFake = [
        {
            id: 1,
            media_url: 'https://via.placeholder.com/150',
            permalink: 'https://www.google.com',
            timestamp: '2021-09-12T00:00:00Z',
        },
        {
            id: 2,
            media_url: 'https://via.placeholder.com/150',
            permalink: 'https://www.google.com',
            timestamp: '2021-09-12T00:00:00Z',
        },
        {
            id: 3,
            media_url: 'https://via.placeholder.com/150',
            permalink: 'https://www.google.com',
            timestamp: '2021-09-12T00:00:00Z',
        },
        {
            id: 4,
            media_url: 'https://via.placeholder.com/150',
            permalink: 'https://www.google.com',
            timestamp: '2021-09-12T00:00:00Z',
        },
        {
            id: 5,
            media_url: 'https://via.placeholder.com/150',
            permalink: 'https://www.google.com',
            timestamp: '2021-09-12T00:00:00Z',
        },
        {
            id: 26,
            media_url: 'https://via.placeholder.com/150',
            permalink: 'https://www.google.com',
            timestamp: '2021-09-12T00:00:00Z',
        },
        {
            id: 34,
            media_url: 'https://via.placeholder.com/150',
            permalink: 'https://www.google.com',
            timestamp: '2021-09-12T00:00:00Z',
        },
        {
            id: 44,
            media_url: 'https://via.placeholder.com/150',
            permalink: 'https://www.google.com',
            timestamp: '2021-09-12T00:00:00Z',
        },
    ]

    const dataMemo = useMemo(() => dataFake, [dataFake])

    const quantityData = useMemo(() => {
        const quantity = valueSettings.numberRows * valueSettings.numberColumns
        if (dataMemo.length < quantity) {
            return dataMemo.length
        }

        return quantity
    }, [valueSettings.numberRows, valueSettings.numberColumns])

    return (
        <Grid
            columns={{ xs: 1, sm: 2, md: 3, lg: 3, xl: valueSettings.numberColumns }}
            children={dataMemo.slice(0, quantityData ?? 1).map((item) => (
                <Grid.Cell key={item.id}>
                    <img src={item.media_url} height={200} className={'image'} />

                    <Box
                        className={'image--hover'}
                        onClick={() => window.open(item.permalink, '_blank')}
                    >
                        <Text alignment="center" fontWeight="semibold">
                            {moment(item.timestamp).format('LLL')}
                        </Text>

                        <Icon source={ViewIcon} color="subdued" />
                    </Box>
                </Grid.Cell>
            ))}
        />
    )
}

FeedItem.displayName = 'FeedItem'
FeedItem.propTypes = {
    data: PropTypes.array,
    valueSettings: PropTypes.object,
}

export default memo(FeedItem)
