import { BlockStack, Icon, InlineStack, ResourceItem, Text, Thumbnail } from '@shopify/polaris'
import PropTypes from 'prop-types'
import { CheckSmallIcon } from '@shopify/polaris-icons'
import React, { memo } from 'react'

import { formatDate } from '../../helpers/utils/functions'

const ProductItem = ({
    id = 1,
    country = 'Viet Nam',
    productImage = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg',
    timestamp = '2024-05-27T23:08:33-04:00',
    productName = 'Sport Shoes',
    timeAgo = '1 hour ago',
}) => {
    return (
        <ResourceItem
            id={id}
            media={<Thumbnail source={productImage} alt="" />}
            // accessibilityLabel={`View details for`}
        >
            <InlineStack align="space-between" blockAlign="start">
                <BlockStack>
                    <Text>Someone in {country}</Text>
                    <Text as="strong" variant="headingSm">
                        Purchased {productName}
                    </Text>
                    <InlineStack gap={300}>
                        <Text>{timeAgo}</Text>
                        <InlineStack>
                            <Icon source={CheckSmallIcon} tone="base" />
                            by AVADA
                        </InlineStack>
                    </InlineStack>
                </BlockStack>
                <Text tone="base">From: {formatDate(timestamp)}</Text>
            </InlineStack>
        </ResourceItem>
    )
}

ProductItem.propTypes = {
    id: PropTypes.number,
    country: PropTypes.string,
    productImage: PropTypes.string,
    timestamp: PropTypes.string,
    productName: PropTypes.string,
    timeAgo: PropTypes.string,
}
ProductItem.displayName = 'ProductItem'

export default memo(ProductItem)
