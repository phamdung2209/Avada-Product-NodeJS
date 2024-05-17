import { BlockStack, Box, SkeletonTabs, Spinner } from '@shopify/polaris'
import React, { memo } from 'react'

const SkeletonProduct = () => {
    return (
        <>
            <SkeletonTabs />
            <BlockStack inlineAlign="center">
                <Box padding="400">
                    <Spinner accessibilityLabel="Spinner example" size="small" />
                </Box>
            </BlockStack>
        </>
    )
}

export default memo(SkeletonProduct)
