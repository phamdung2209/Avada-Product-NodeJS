import { Box, Text } from '@shopify/polaris'
import React, { memo } from 'react'

const ItemProduct = ({ id, name, price, description, createdAt }) => {
    return (
        <Box padding="4">
            <Text variant="bodyMd" fontWeight="bold" as="h3">
                {name} - {id}
            </Text>
            <Text variant="bodySm">${price}</Text>
            <Text variant="bodySm">{description}</Text>

            <Text variant="bodySm" muted>
                {createdAt}
            </Text>
        </Box>
    )
}

export default memo(ItemProduct)
