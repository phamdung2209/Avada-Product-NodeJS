import { Grid, Icon, Text } from '@shopify/polaris'
import React, { memo } from 'react'
import { ViewIcon } from '@shopify/polaris-icons'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'

import styles from './ContentPreview.module.scss'
import useGetMedia from '@assets/hooks/ig/useGetMedia'
import moment from 'moment'

const cx = classNames.bind(styles)

const ContentPreview = ({ data }) => {
    const { loading } = useGetMedia()

    return loading ? (
        <div>loading ...</div>
    ) : data?.length ? (
        <Grid columns={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4 }}>
            {/* {data.map((item) => (
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
            ))} */}

            {Array.from({ length: 8 }).map((_, index) => (
                <Grid.Cell key={index}>
                    <img src={'item.media_url'} height={200} className={cx('image')} />

                    <div className={cx('image--hover')}>
                        <Text alignment="center" fontWeight="semibold">
                            dđ
                        </Text>

                        <Icon source={ViewIcon} color="subdued" />
                    </div>
                </Grid.Cell>
            ))}
        </Grid>
    ) : null
}

ContentPreview.displayName = 'ContentPreview'
ContentPreview.propTypes = {
    data: PropTypes.array,
}

export default memo(ContentPreview)
