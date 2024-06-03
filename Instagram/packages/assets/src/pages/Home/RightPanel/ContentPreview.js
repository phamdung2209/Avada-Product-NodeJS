import { Grid, Icon, Text } from '@shopify/polaris'
import React, { memo } from 'react'
import { ViewIcon } from '@shopify/polaris-icons'
import classNames from 'classnames/bind'

import styles from './ContentPreview.module.scss'
import useGetMedia from '@assets/hooks/ig/useGetMedia'
import moment from 'moment'

const cx = classNames.bind(styles)

const ContentPreview = () => {
    const { data, loading } = useGetMedia()

    return loading ? (
        <div>loading ...</div>
    ) : data.length ? (
        <Grid columns={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4 }}>
            {data.map((item) => (
                <Grid.Cell key={item.id}>
                    <img src={item.media_url} height={200} className={cx('image')} />

                    <div
                        className={cx('image--hover')}
                        onClick={() => window.open(item.permalink, '_blank')}
                    >
                        <Text alignment="center" fontWeight="semibold">
                            {moment(item.timestamp).format('LLL')}
                        </Text>

                        <Icon source={ViewIcon} color="subdued" />
                    </div>
                </Grid.Cell>
            ))}
        </Grid>
    ) : null
}

export default memo(ContentPreview)
