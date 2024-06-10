import moment from 'moment'
import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'

import './FeedItem.scss'
import { ViewIcon } from '@assets/resources/icons'

const FeedItem = ({ data, valueSettings }) => {
    const dataMemo = useMemo(() => data, [data])

    const quantityData = useMemo(() => {
        const quantity = valueSettings.numberRows * valueSettings.numberColumns
        if (dataMemo.length < quantity) {
            return dataMemo.length
        }

        return quantity
    }, [valueSettings.numberRows, valueSettings.numberColumns])

    return (
        // <Grid
        //     columns={{ xs: 1, sm: 2, md: 3, lg: 3, xl: valueSettings.numberColumns }}
        //     children={dataMemo.slice(0, quantityData ?? 1).map((item) => (
        //         <Grid.Cell key={item.id}>
        //             <img src={item.media_url} height={200} className={'image'} />

        //             <Box
        //                 className={'image--hover'}
        //                 onClick={() => window.open(item.permalink, '_blank')}
        //             >
        //                 <Text alignment="center" fontWeight="semibold">
        //                     {moment(item.timestamp).format('LLL')}
        //                 </Text>

        //                 {/* <Icon source={ViewIcon} color="subdued" /> */}
        //             </Box>
        //         </Grid.Cell>
        //     ))}
        // />

        <div
            className="feed-item__container"
            style={{
                gridTemplateColumns: `repeat(${valueSettings.numberColumns}, 1fr)`,
                gap: `${valueSettings.spacing}px`,
            }}
        >
            {dataMemo.slice(0, quantityData ?? 1).map((item) => (
                <div key={item.id} className="feed-item__item">
                    <img
                        src={item.media_url}
                        height={200}
                        className="feed-item__image"
                        alt={item.caption}
                        style={{
                            width: '100%',
                        }}
                    />

                    <div
                        className="feed-item__image--hover"
                        onClick={() => window.open(item.permalink, '_blank')}
                    >
                        <p className="feed-item__text">{moment(item.timestamp).format('LLL')}</p>

                        <ViewIcon className="feed-item__icon" />
                    </div>
                </div>
            ))}
        </div>
    )
}

FeedItem.displayName = 'FeedItem'
FeedItem.propTypes = {
    data: PropTypes.array,
    valueSettings: PropTypes.object,
}

export default memo(FeedItem)
